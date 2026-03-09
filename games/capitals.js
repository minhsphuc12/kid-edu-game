function setup_capitals(area) {
  const data = [
    { country: 'France',       capital: 'Paris',          wrong: ['London', 'Berlin', 'Rome'] },
    { country: 'Japan',        capital: 'Tokyo',          wrong: ['Seoul', 'Beijing', 'Bangkok'] },
    { country: 'Australia',    capital: 'Canberra',       wrong: ['Sydney', 'Melbourne', 'Perth'] },
    { country: 'Brazil',       capital: 'Brasília',       wrong: ['São Paulo', 'Rio de Janeiro', 'Salvador'] },
    { country: 'Germany',      capital: 'Berlin',         wrong: ['Munich', 'Hamburg', 'Frankfurt'] },
    { country: 'USA',          capital: 'Washington DC',  wrong: ['New York', 'Los Angeles', 'Chicago'] },
    { country: 'UK',           capital: 'London',         wrong: ['Manchester', 'Edinburgh', 'Birmingham'] },
    { country: 'China',        capital: 'Beijing',        wrong: ['Shanghai', 'Guangzhou', 'Shenzhen'] },
    { country: 'Vietnam',      capital: 'Hanoi',          wrong: ['Ho Chi Minh City', 'Da Nang', 'Hue'] },
    { country: 'Canada',       capital: 'Ottawa',         wrong: ['Toronto', 'Vancouver', 'Montreal'] },
    { country: 'Italy',        capital: 'Rome',           wrong: ['Milan', 'Naples', 'Florence'] },
    { country: 'Spain',        capital: 'Madrid',         wrong: ['Barcelona', 'Seville', 'Valencia'] },
    { country: 'India',        capital: 'New Delhi',      wrong: ['Mumbai', 'Bangalore', 'Chennai'] },
    { country: 'Russia',       capital: 'Moscow',         wrong: ['St. Petersburg', 'Kazan', 'Novosibirsk'] },
    { country: 'Argentina',    capital: 'Buenos Aires',   wrong: ['Córdoba', 'Rosario', 'Mendoza'] },
    { country: 'South Africa', capital: 'Pretoria',       wrong: ['Cape Town', 'Johannesburg', 'Durban'] },
    { country: 'Egypt',        capital: 'Cairo',          wrong: ['Alexandria', 'Giza', 'Luxor'] },
    { country: 'Turkey',       capital: 'Ankara',         wrong: ['Istanbul', 'Izmir', 'Bursa'] },
    { country: 'Mexico',       capital: 'Mexico City',    wrong: ['Guadalajara', 'Monterrey', 'Cancún'] },
    { country: 'South Korea',  capital: 'Seoul',          wrong: ['Busan', 'Incheon', 'Daegu'] },
    { country: 'Indonesia',    capital: 'Jakarta',        wrong: ['Bali', 'Surabaya', 'Bandung'] },
    { country: 'Thailand',     capital: 'Bangkok',        wrong: ['Chiang Mai', 'Phuket', 'Pattaya'] },
    { country: 'Malaysia',     capital: 'Kuala Lumpur',   wrong: ['Penang', 'Johor Bahru', 'Ipoh'] },
    { country: 'Philippines',  capital: 'Manila',         wrong: ['Cebu', 'Davao', 'Quezon City'] },
    { country: 'Portugal',     capital: 'Lisbon',         wrong: ['Porto', 'Faro', 'Coimbra'] },
    { country: 'Netherlands',  capital: 'Amsterdam',      wrong: ['Rotterdam', 'The Hague', 'Utrecht'] },
    { country: 'Sweden',       capital: 'Stockholm',      wrong: ['Gothenburg', 'Malmö', 'Uppsala'] },
    { country: 'Norway',       capital: 'Oslo',           wrong: ['Bergen', 'Trondheim', 'Stavanger'] },
    { country: 'Greece',       capital: 'Athens',         wrong: ['Thessaloniki', 'Patras', 'Heraklion'] },
    { country: 'Poland',       capital: 'Warsaw',         wrong: ['Kraków', 'Gdańsk', 'Wrocław'] },
    { country: 'Switzerland',  capital: 'Bern',           wrong: ['Zurich', 'Geneva', 'Basel'] },
    { country: 'Colombia',     capital: 'Bogotá',         wrong: ['Medellín', 'Cali', 'Cartagena'] },
    { country: 'Kenya',        capital: 'Nairobi',        wrong: ['Mombasa', 'Kisumu', 'Nakuru'] },
    { country: 'Nigeria',      capital: 'Abuja',          wrong: ['Lagos', 'Kano', 'Ibadan'] },
    { country: 'Saudi Arabia', capital: 'Riyadh',         wrong: ['Jeddah', 'Mecca', 'Medina'] },
    { country: 'New Zealand',  capital: 'Wellington',     wrong: ['Auckland', 'Christchurch', 'Hamilton'] },
    { country: 'Peru',         capital: 'Lima',           wrong: ['Cusco', 'Arequipa', 'Trujillo'] },
    { country: 'Chile',        capital: 'Santiago',       wrong: ['Valparaíso', 'Concepción', 'Antofagasta'] },
    { country: 'Ukraine',      capital: 'Kyiv',           wrong: ['Kharkiv', 'Odessa', 'Lviv'] },
    { country: 'Singapore',    capital: 'Singapore',      wrong: ['Kuala Lumpur', 'Bangkok', 'Jakarta'] },
  ];

  const entry = pick(data);
  const options = shuffle([entry.capital, ...entry.wrong]);

  addQ(area, 'What is the capital of ' + entry.country + '? 🌏');

  const display = makeDisplay();

  const card = document.createElement('div');
  card.style.background = 'linear-gradient(135deg,#f0fff0,#e0f5e0)';
  card.style.borderRadius = '18px';
  card.style.padding = '16px 28px';
  card.style.fontFamily = "'Fredoka One', cursive";
  card.style.fontSize = '1.8rem';
  card.style.color = '#2D2D2D';
  card.style.textAlign = 'center';
  card.style.boxShadow = '0 4px 0 rgba(0,0,0,.08)';
  card.textContent = entry.country;
  display.appendChild(card);

  const grid = document.createElement('div');
  grid.className = 'opts-2';

  options.forEach(function (city) {
    const btn = document.createElement('button');
    btn.className = 'opt opt-text';
    btn.textContent = city;

    btn.addEventListener('click', function () {
      if (!canAns) return;

      if (city === entry.capital) {
        btn.classList.add('is-correct', 'hi-correct');
        onCorrect();
      } else {
        btn.classList.add('is-wrong', 'hi-wrong');
        onWrong();
        setTimeout(function () {
          btn.classList.remove('is-wrong', 'hi-wrong');
          canAns = true;
        }, 520);
      }
    });

    grid.appendChild(btn);
  });

  display.appendChild(grid);
  area.appendChild(display);
}
