// Alba+ one-pager — gedrag van de originele versie, zonder React.
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // "Stuur me updates over de lancering": scroll naar de inschrijving en focus het e-mailveld
  var cta = document.querySelector('.home-hero button:not([type="submit"])');
  if (cta) {
    cta.addEventListener('click', function () {
      document.getElementById('lancering').scrollIntoView({ behavior: reduce ? 'instant' : 'smooth' });
      var input = document.getElementById('newsletter-email');
      if (input) input.focus({ preventScroll: true });
    });
  }

  // Inschrijving: er is geen server; na bevestiging opent een vooraf ingevulde e-mail naar hello@alba.plus
  var wrap = document.querySelector('.newsletter-form');
  if (!wrap) return;
  var form = wrap.querySelector('form');
  var BTN = 'inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full text-base font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary underline-offset-4 hover:underline';
  var ICON = 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = form.querySelector('#newsletter-email').value;
    var consent = form.querySelector('input[type="checkbox"]').checked;
    if (!consent) return;
    var body = 'Hallo Alba+,\n\nIk ontvang graag updates over jullie lancering, onderzoek en verhalen op ' + email + '.\n\nIk geef toestemming om mij hierover te e-mailen.\n\nBedankt!';
    var href = 'mailto:hello@alba.plus?subject=Alba%2B%20%E2%80%94%20updates%20over%20de%20lancering&body=' + encodeURIComponent(body);

    var result = document.createElement('div');
    result.className = 'signup-result';
    result.setAttribute('role', 'status');
    result.innerHTML =
      '<svg ' + ICON + ' width="22" height="22" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"></path></svg>' +
      '<div>' +
        '<p class="font-medium">Je inschrijving staat klaar.</p>' +
        '<p class="mt-1 text-sm text-muted-foreground">Verstuur je e-mail om je inschrijving af te ronden.</p>' +
        '<a class="' + BTN + ' py-3 mt-3 h-auto px-0">Verstuur inschrijving <svg ' + ICON + ' width="24" height="24" class="lucide lucide-arrow-up-right"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg></a>' +
        '<button type="button" class="' + BTN + ' py-3 ml-4 mt-3 h-auto px-0">Terug</button>' +
      '</div>';
    result.querySelector('a').href = href;
    result.querySelector('button').addEventListener('click', function () {
      wrap.replaceChild(form, result);
    });
    wrap.replaceChild(result, form);
  });
})();
