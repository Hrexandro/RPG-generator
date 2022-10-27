// to add:
// random encounters/ varied by regions - add some monsters to default, add defaults to nondefault as well
// cult generator
// make sure half the encounters are creatures
// ghoul
// add arcane catastrophes from: fatal, GURPS magic and thaumatology, Dark Heresy, WFRP, Dungeon Crawl Classics
// add animals

import { MBNames, MBTowns, VOTENobleNames, wizardNames } from './names.js'

const generateButton = document.getElementById('generate-button')
const nameDisplay = document.getElementById('name-display')
const categoryPicker = document.getElementById('kategoria')
const numberPicker = document.getElementById('liczba')

function updatePick () {
  category = categoryPicker.value
  numberGenerated = numberPicker.value
}

let numberGenerated = 20
let category = 'MBNames'

function k (sides, exploding = false) {
  let result = Math.floor(Math.random() * sides) + 1
  if (exploding === true) {
    if (result === sides) {
      result = result + k(sides, true)
    }
  }

  return result
}

class Roll {
  constructor (result) {
    this.result = result
  }
}

// random encounters losowe spotkania

const MBRandomEncounters = function () {
  return {
    type: 'pickerRoller',
    list: [
      // Overland Travel
      'Nie dzieje się nic konkretnego, świat jest szary.',
      'Pogorszenie pogody.',
      'Zmiana pogody.', // na??
      'Droga się rozwidla, znaki są nieczytelne (przerzut).',
      'Klasztor przy drodze (Mnisi i zakonnice są kultystami Nechrubela).',
      'Ruiny zamku odznaczają się na tle nieba (zamieszkują je dzikie wrony, w jednej wieży, która przetrwała mieszka ślepy alchemik).',
      'Religijna procesja biczowników i pustelników (Zmierzają do NIEGO, ale zgubili drogę).',
      'Brudni rolnicy w drodze na targ.',
      'Po drugiej stronie drogi trwa walka pomiędzy bandą obdartych ze skóry kultystów a watahą kundlaków.',
      'Troll Adnah atakuje z zaskoczenia.',
      `${k(6)} racji żywności/wody się psuje.`,
      `${k(6) + 1} łowców niewolników prowadzi ${k(11) + 1} niewolników, połowa pobita niemal na śmierć, połowa świeżo złapanych.`,
      `Grupa najemników i ich ${k(6)} strażników (wszyscy zainfekowani pasożytem mózgu).`,
      `Opuszczony cmentarz (w kaplicy znajduje się odwrócony złoty krzyż wart 50s. ${k(8)} zombie ukrywa się w krypcie.`,
      'Pochód pogrzebowy bezzębnych wieśniaków niosących bardzo wielką trumnę (olbrzym wewnątrz jest martwy, lecz śniący).',
      `Dwoje zwłok u boku drogi, w kieszeni jednego z nich znajduje się: ${pickFromList(MBCorpseLoot)}`,
      // new
      `Przeciwnik! ${pickFromList(MBMonsters)} - liczba: ${k(20)}`,
      `Przeciwnik! ${pickFromList(MBMonsters)} - liczba: ${k(10)}`,
      `Przeciwnik! ${pickFromList(MBMonsters)} - liczba: ${k(8)}`,
      `Przeciwnik! ${pickFromList(MBMonsters)} - liczba: ${k(6)}`,
      `Przeciwnik! ${pickFromList(MBMonsters)} - liczba: ${k(4)}`,
      'Zbliża się osiodłany koń bez jeźdźca. W torbach ma 4k10 racji zakonserwowanego ludzkiego mięsa. Jeśli drużyna zabierze mięso, koń opuści głowę i pogalopuje w dal.',
      'Zbliża się stary mężczyzna pchający wózek, na którym znajduje się ogromna książka i pyta bohaterów o ich imiona. Jeśli mu je podadzą, zapisuje je w księdze. Zimny dreszcz przebiega po ich kręgosłupach.',
      'Spotykacie dwójkę upiornych dzieci grających w kości doliny śmierci. Robią zakłady z omenów i chętnie zaproszą nowych graczy do rozgrywki.',
      "Staje przed wami fraktalna forma Y'cthonlla, tego, który zamieszkuje Pomiędzy. Członkowie drużyny muszą przejść test DR16 na Prezencję, aby nie uciec z wrzaskiem od jego przeraźliwego widoku. Ci, którzy pozostali otrzymują mały mosiężny kluczyk.",
      'Waszą drogę przecina wir pyłowy, z jego wnętrza słychać odgłosy orkiestry dętej. Jeśli wrzucisz do środka trochę srebra, nie zbliży się do ciebie. Wrzuć więcej, a może przystanie na twoją prośbę.',
      'Na uboczu drogi siedzi stary mężczyzna ze złotym instrumentem strunowym. Obiecuje, że pozwoli wam przejść, jeśli pokonacie go w grze. A jeśli przegracie… ?',
      'Kobieta w bieli stoi przy drodze trzymając płaczące niemowlę, prosi rozpaczliwie by ktoś je potrzymał. Jeśli się zgodzisz, dziecko staje się cięższe z każdą sekundą. Test DR16 na siłę, porażka to upuszczenie dziecka, kobieta wysysa 1 omen, sukces - kobieta odbiera uspokojone dziecko i otrzymujesz 1 omen. Jeśli odmówią potrzymania, kobieta zmienia się w zjawę i atakuje.',
      'Spotykacie wyniszczone mauzoleum, które skrywa dziwny sekret. Uwięziony w nim, wewnętrz stale obracającego się kryształowego więzienia, został bard. Przez wiele dziesięcioleci uznawany był za martwego i prosi was o uwolnienie. Jest bardzo sławny w tej okolicy i obiecuje nagrodę.',
      'Małe dziecko podbiega do was i krzyczy "jesteście wybrańcami!".',
      'Dwoje zwłok leży w rowie. Drwal, zmiażdżony i z połamanymi kośćmi i kupiec z głęboką raną od siekiery z tyłu głowy. Obok nich leży (przeklęty) mieszek z k10*6 srebra. Po wzięciu srebra kupiec powstaje: HP 12, nieumarły (powstaje ponownie po k3 rundach), k10 obrażeń (miażdżąca kości siła).',
      'Ni stąd, ni zowąd pojawia się berserker. Nie atakuje jednak drużyny, chce im tylko opowiedzieć swoją hipotezę o Wymiarze Krwi jako części metafizycznego i dosłownego "ciała" obejmującego rzeczywistość. Pyta: Jaką część tego "ciała" zamieszkujecie?',
      'W oddali tanecznymi ruchami porusza się latarnia. Nie widzicie żadnej postaci trzymającej latarnię. Zauważa was. O BOŻE LECI PROSTO NA WAS!!!',
      'Mija was procesja zakapturzonych mnichów, którzy powtarzają w kółko "koniunkcja nadeszła koniunkcja nadeszła!". Czujesz drżenie podłoża w miarę zbliżania się do nich.',
      'W środku nocy ogień w waszym ognisku ożywa. Domaga się więcej drewna.',
      'Z nieba spada mężczyzna, rozpryskując krew na wszystkie strony. Ma przy sobie Zwój Lewitacji, który powoduje unoszenie się w powietrzu. Po k20 minutach unoszenia się, zaklęcie przestaje działać.',
      'Napotykasz kryształowo czystą rzekę. Przyjrzyj się z bliska: twoje odbicie wygląda na zadowolone z tego, że cię widzi.',
      `Spoglądasz w ciemność i czujesz się, jakbyś napotkał czyjś wzrok. Jesteś sparaliżowany. Nagle naciera na ciebie istota. Ma 4 metry wysokości i składa się z cienia. Jest wygłodniała. ${MBMonsters.list.find((monster) => { return monster.slice(0, 13) === 'Istota cienia' })}`,
      'Nagle czujesz bulgotanie w trzewiach i musisz natychmiast ściągnąć spodnie, bo inaczej w nie narobisz. Jeśli przyjrzysz się odchodom, zobaczysz malutkie różowe robaki, które z każdą chwilą rosną. Jeśli nie zdjąłeś spodni, śmierdzisz okropnie, a robaki wpełzają z powrotem do środka, wywołując kolejną defekację po 2k6 minutach.',
      'k6 różowych ptaków zaczepia ciebie i twoich kompanów, krytykując wasze czułe punkty',
      'Dwie gałęzie pękają jednocześnie, z obu stron zbliżają się identyczne jelenia albinosy, poruszające się jak lustrzane odbicia.',
      'Hrangvold Posokowiec, wynajęty przez Zakon Roztopionego Sztyletu aby zabić członka drużyny, zbliża się do was i domaga się pojedynku. Nic nie wiecie o takim zakonie. Hrangvold chce pojedynkować się o świcie, albo o północy, w zależności od tego, co jest bliżej. Godzinę odczytuje z oczu kota, którego trzyma w płaszczu. HP: 9, Morale: 6, Bez zbroi, k6 (kot jako broń), cechy specjalne: wszystkie udane ataki liczą się jak krytyki, porażki jako krytyczne porażki. Kiedy Hrangvold zginie, jego kot będzie podążał za drużyną przez 2k6 dni, aż mu się znudzi. Ma talent do harmonicznego miauczenia.',
      'Przebiega przed wami czarny kot.',
      'Przebiega przed wami biały kot.',
      'Kątem oka dostrzegasz drewnianą chatę. Przysiągłbyś, że jeszcze przed chwilą jej tam nie było. Z komina unosi się dym, nad ogniem piecze się apetycznie pachnąca zupa, ale czujesz, że coś jest nie tak.',
      'Ucięta głowa spada z nieba, wrzeszcząc cały czas. 1/6, że powie coś przydatnego zanim się rozbryźnie.',
      'Wydaje ci się, że słyszysz głos. Przy bliższej inspekcji zauważasz, że to stare drzewo mówi, bardzo powoli. Jeśli poświęcisz czas na rozmowę z nim, opowie dłuuuugą historię, trwającą k6 dni. Na oniec historii, drzewo spełni jedno życzenie, drzewo spełnia dokładnie to co powiesz, ale interpretuje słowa w najgorszy możliwy sposób.',
      '32 nieumarłych stoi na polu rozgrywając wielką partię szachów przeciwko sobie.',
      'Ptak próbuje nieść ropuchę, która jest zbyt wielka dla jego dzioba. Ropucha krzyczy: "Ratujcie mnie! Jestem księciem! Nagrodzę was!" Nagrodą ropuchy jest ukryta kupka much.',
      'Zauważacie trolla tak masywnego, że zajmuje się polowaniem na inne trolle i masywne bestie. Nawet was nie zauważa, dziękować Bazyliszkom. Troll ma 1550 HP.',
      'Napotykasz kamień, na którym jest rozciągnięta wytatuowana twarz. Jeśli zdejmiesz twarz z kamienia i naciągniesz ją na swoją, otrzymujesz losowy przeklęty zwój tak długo, jak masz ją na sobie. Zwój jest przerzucany co zmrok. Rzuty na reakcję w czasie noszenia go mają -4 do wyniku.',
      'Kupiec z odwrotnymi rękami oferuje wam martwą kurę, wyskubaną i w perfekcyjnym stanie, za zaledwie 5 srebra. Jak tylko kupiec się oddali, bezgłowa kura ożywa i zaczyna niszczyć wasze zapasy.',
      'Dręczy was rój nietoperzy. Zjadają one racje żywnościowe, żują wasze ubrania. Jeśli uda się zabić, któregoś z nich, zobaczycie, że całe są pokryte malutkimi marynarskimi tatuażami.'
    ]
  }
}

// Other other

const MBWeather = {
  type: 'picker',
  list: [
    'Martwa szarość',
    'Walący deszcz',
    'Przeszywający wiatr',
    'Ogłuszająca burza',
    'Ciemno jak w nocy',
    'Martwa cisza',
    'Urwanie chmury',
    'Mgła gęsta jak zupa',
    'Trzaskający mróz',
    'Irytująca mżawka',
    'Warczące grzmoty',
    'Grobowe zimno'
  ]
}

const mutations = function () {
  // przeszukiwanie zwłok, rabowanie zwłok
  return {
    type: 'pickerRoller',
    list: [
      'Groteska - Zostajesz straszliwie zdeformowany, poznaczony bliznami, poszarpany -3 do charyzmy i rzucasz jeszcze raz.',
      'Spaczone organy - Twoje flaki zwijają się. Za każdym razem kiedy dostaniesz silne obrażenia, wszyscy w zasięgu 10 metrów rzucają na strach.',
      'Nietoperze skrzydła - poruszasz się na nich ze standardową prędkością.',
      `Dodatkowe usta - ${k(6) + k(6)} ust wyrasta na twojej głowie i szyi`,
      `Beczkowaty tułów - masywny, szeroki, cylindryczny. +${k(6)} Budowy, +${k(6)} HP.`,
      'Jedna ręka przemienia się w zwykłe narzędzie.',
      'Kopytny - na końcach twoich nóg wyrastają kopyta. Nie możesz nosić butów, potrzebujesz podków.',
      'Niestabilne mięso - w momencie twojej śmierci, twoje pasożytnicze kończyny próbują zaatakować w zwarciu pobliskie istoty i zrosnąć się z nimi.',
      'Szczypce kraba - jedna z twoich rąk zmienia się w szczypce. K8 obrażeń miażdżących, zawsze atakujesz ostatni.',
      'Haczykowate palce - zesztywniałe i kościste. k6 obrażeń, ale nie może trzymać broni.',
      'Wzór na skórze - pionowe pasy w ciemnej i jasnej tonacji.',
      'Wywrócony na lewą stronę. Okropieństwo, charyzma zredukowana do 2, HP zmniejszone o połowę.',
      'Dziura - Tajemnicza dziura w czole.',
      'Trująca plamka - niebieska plamka rozmiaru monety na twoim brzuchu. Każdy kto ją dotknię musi wykonać rzut obronny na śmierć.',
      `1000 nosów na całym ciele -${k(6)} charyzmy. Twój węch jest równie precyzyjny jak wzrok w zasięgu 10 metrów.`,
      'Wycieraczki do oczu - malutkie rączki wyrastają z twoich skroni. Przecierają ci brwi i wycierają oczy.',
      'Pomarańczowa kryza na szyi. Można ją postawić by wystraszyć bestie lub dzieci. Może wymagać rzutu na morale.',
      'Okropny smród - śmierdzisz spalonym mięsem i włosami. Ukrywanie się sprawia ci trudność.',
      'Magnetyczny zmysł - potrafisz wyczuć magnetyczną północ, chyba że przebywasz w pobliżu silnego pola magnetycznego lub żelaza.',
      'Zawiasowa głowa - ogromny zębaty uśmiech od ucha do ucha. Głowa otwiera się jak skrzyneczka.',
      'Skórzasty grzbiet - zawsze liczysz się tak, jakbyś miał skórzany pancerz.',
      `Błyskawiczna szybkość - stajesz się ruchliwy i zwinny. ${k(6)} do zręczności, podwójna szybkość poruszania się.`,
      'Jadowity - naturalne ataki (ugyzienie, drapanie itd.), zadają k4 obrażeń od trucizny.',
      'Szpiczaste zęby - długie i ząbkowane. Uszkodzone odrastają w tydzień.',
      'Opary - wydzielasz śmierdzące żółte opary z uszu. Skradanie się jest prawie niemożliwe.',
      'Mleko - 1 racja dziennie. Wywołuje ból, jeśli zaniedbywane przez więcej, niż 3 dni. Szczegóły ustal sam.',
      'Małpi ogon - może chwytać przedmioty. Daje przewagę podczas wspinaczki.',
      'Dziwaczny kolor - skóra zmienia kolory z jednego na drugi jak zepsuty telewizor.',
      `Ogromne ręce - stają się gigantyczne, podczas gdy nogi się kurczą. Możesz używać ich do chodzenia. +${k(6)} siły`,
      'Przerost brawury - zero poczucia zagrożenia. Niewrażliwy na strach. Zachowuje niektóre, ale nie wszystkie środki ostrożności.',
      'Feromony - twój zapach odstrasza owady. Zasięg 6 metrów.',
      'Atrofia - losowa kończyna staje się uschnięta i bezużyteczna.',
      'Pozamieniane kończyny - nogi i ręce zamieniają się miejscami. Nie przeszkadza ci to w poruszaniu się',
      `Anielska twarz - jak porcelanowa maska. +${k(6)} do charyzmy.`,
      'Wrażliwa skóra - dotykanie srebra lub żelaza powoduje bolesną, swędzącą wysypkę',
      'Ptasie skrzydła - szczątkowe, nie umożliwiają lotu.',
      'Kłuta kończyna - jedna dłoń zmienia się w ostry kościany kolec. Działa jak sztylet.',
      'Niemowa - twój język znika.',
      'Nietypowe genitalia - cokolwiek miałeś tam wcześniej, teraz jest inne i dziwne.',
      'Fioletowe zarodniki - fioletowy kapelusz grzyba w miejscu włosów, w chwili śmierci wydziela halucynogeniczne zarodniki w zasięgu 10 metrów.',
      'Pojedyńcze ptasie skrzydło - zlokalizowane na losowej kończynie, bezużyteczne.',
      'Nędzna szczęka - potężny nagryz pionowy.',
      'Trzecie oko - na czole. Nie wpływa na nic, ale wygląda mistycznie.',
      'Psia twarz - obwisłe policzki, długi nos, opadnięte uszu. Bez futra, tylko pomarszczona skóra.',
      'Perfekcyjna pamięć - potrafi przywołać najdrobniejsze detale każdego wydarzenia ze swojego życia.',
      'Zła postawa - głowa zamieniona miejscami z nogą. Porusza się z połową normalnej prędkości.',
      'Płaty skórne - jak u lotopałanki. Spada trochę wolniej niż normalnie.',
      `Długi nos - wystający, zgięty. ${10 + k(20)} cm długości.`,
      'Dziwny chód - twoje stawy zginają się w dziwnej kolejności. Odrobinę powolniejsze poruszanie się.'

    ]
  }
}

const MBTerribleTraits = {
  // okropne cechy
  type: 'picker',
  list: [
    'Nieustannie rozdrażniony',
    'Kompleks niższości',
    'Ma problemy z autorytetami',
    'Pyskaty krzykacz',
    'Okrutny',
    'Egocentryczny',
    'Nihilistyczny',
    'Skłonność do nadużywania środków odurzających',
    'Skonfliktowany',
    'Podstępny',
    'Mściwy',
    'Tchórzliwy',
    'Leniwy',
    'Podejrzliwy',
    'Bezlistosny',
    'Zamartwia się',
    'Zgorzkniały',
    'Zdradliwy',
    'Marnotrawny',
    'Arogancki',
    'Obżartus', // ok
    'Chciwy', // ok
    // "Erotoman", //nope
    'Wymądrzający się', // ok
    'Paranoik', // ok
    'Sarkastyczny',
    'Złośliwy',
    'Naiwny, uwierzy nawet w najmniej wiarygodne kłamstwo'
  ]
}

const MBBrokenBodies = {
  // broken bodies zniszczone ciała cechy
  type: 'picker',
  list: [
    'Wpatrujący się, maniakalny wzrok',
    'Pokryty tatuażami uznawanymi przez niektórych za bluźniercze',
    'Gnijąca twarz, nosi maskę',
    'Brak trzech palców u stopy, kuleje',
    'Wychudły i blady',
    'Jedna dłoń zastąpiona zardzewiałym hakiem (k6 obrażeń)',
    'Gnijące zęby',
    'Niepokojąco piękny, nieznośnie czysty',
    'Dłonie pokryte ropiejącymi wypryskami',
    'Zaćma powoli, ale nieustępliwie pokrywa oboje oczu',
    'Długie, skołtunione włosy, w których mieszka co najmniej jeden karaluch',
    'Zmiażdżone uszy',
    'Drgawki i jąkanie od uszkodzonego nerwu lub stresu',
    'Korpulentny, wygłodniały, ślini się',
    'Jednej ręce brakuje kciuka i palca wskazującego, łapie jak homar',
    'Czerwony, spuchnięty nos alkoholika',
    'Neutralny wyraz twarzy ma maniakalny, ciężko zdobyć przyjaciół',
    'Przewlekła grzybica stóp. Śmierdzi.',
    'Niedawno rozcięte i śmierdzące, ropiejące oko zakryte opaską',
    'Popękane czarne paznokcie, mogą w każdej chwili odpaść',
    'Zezowate spojrzenie', // ok
    'Obcięty koniec języka, sepleni gdy mówi', // ok
    'W chwilach dużego stresu, puszcza gazy', // ok
    'Karzeł', // ok
    'Ciągle jest mu gorąco, na co wiecznie narzeka', // ok
    'Ciągle jest mu zimno, na co wiecznie narzeka', // ok
    'Wysoki jak drzewo, ale chudy jak szczapa' // ok
  ]
}

const MBBadHabits = {
  // bad habits, złe nawyki cechy
  type: 'picker',
  list: [
    'Obsesyjnie zbiera małe, ostre kamienie',
    'Nie użyje żadnego ostrza nie przetestowawszy go uprzednio na własnym ciele. Ręce poprzeszywane blizami.',
    'Jak już zacznie pić, nie może przestać',
    'Uzależniony od hazardu. Musi zakładać się choć raz dziennie. Jeśli przegra, podbija stawkę i zakłada się znów.',
    'Nie toleruje krytyki. Rezultatem jest wściekłość i płacz.',
    'Nie może przejść do sedna. Nigdy nie opowiedział żadnej historii od początku do końca',
    'Najlepszym przyjacielem jest czaszka. Nosi ją ze sobą, opowiada jej wszystko, nikomu innemu nie ufa bardziej.',
    'Dłubie w nosie aż do krwi',
    'Histerycznie śmieje się z własnych żartów, które potem szczegółowo objaśnia.',
    'Nihilista, upiera się, żeby mówić wszystkim, że jest nihilistą i wyjaśniać dlaczego.',
    'Notoryczny zjadacz robali',
    'Na stres reaguje okazywaniem estetyki. Im gorzej sprawy się mają, tym szykowniej musi wyglądać.',
    'Stale zalegająca w gardle flegma. Nieustannie kaszle, smarka, spluwa i przełyka.',
    'Nałogowo kłamie, ciężko mu zdobyć zaufanie innych', // ok
    'Zbieractwo - zbiera i targa ze sobą pełno niepotrzebnych przedmiotów', // ok
    'Ma tendencję do katatonicznego wpatrywania się w jeden punkt przez kilka minut', // ok
    'Skłonność do egzaltacji i przesadzonej gestykulacji', // ok
    'Gada do siebie w najmniej odpowiednich momentach i głośno pomstuje na wszelkie niedogodności', // ok
    'Czuje przymus pomodlenia się za duszę każdego z zabitych wrogów', // ok
    'Piroman',
    'Stale gubi ważne przedmioty i zapomina ważne fakty',
    'Plotkarz, obgaduje każdego, którego akurat nie ma w pobliżu',
    'Jąka się, gdy kłamie',
    'Chichocze szaleńczo w najgorszych momentach',
    'Gwiżdże, gdy próbuje się ukryć, zaprzecza, jakoby tak robił. Gwiżdże przy 5, 7, 9, 11 lub 13 wyrzuconym na k20',
    'Robi biżuterię z ludzkich zębów',
    'Przywłaszcza sobie wszelkie zasługi' // ok
  ]
}

const MBTroublingTales = {
  // troubling tales, troublingtales, niepokojące historie
  type: 'picker',
  list: [
    'Poszukiwany za pozbawienie życia. Jest nagroda',
    'Ogromne długi. Twój dług jest sprzedawany coraz bardziej bezlitosnym grupom',
    'Posiada rzadki, pożądany przez wielu, przedmiot',
    'Ma przeklętą ranę, która nigdy się nie goi,',
    'Miał nielegalny, niemoralny i sekretny romans z członkiem rodziny królewskiej. Ma na to dowód.',
    'Zbiegły kultysta. Przerażony i paranoidalny. Inni kultyści są wszędzie',
    'Złodziej tożsamości, który niedawno zabił i zastąpił tę osobę',
    'Wygnany i wydziedziczony za nieokreślony przewinienia. Nigdy nie może wrócić do domu.',
    'Zdezerterował z wojska po byciu świadkiem masakry. Jest nagroda za jego głowę. Polują na niego dawni przyjaciele',
    'Bardzo niedawno zamordował bliskiego krewnego. Bardzo niedawno',
    'Sześcian-układanka został skalibrowany niewłaściwie (a może właśnie właściwie?), budząc śpiącą abominację',
    'Złe istoty kochają twój zapach i są do niego przyciągane, sprowadzając nieszczęście wszędzie tam, gdzie się udasz',
    'W bitewnej ranie pozostał fragment metalu, który powoli zbliża się do twojego serca. Każdego dnia jest 2% szansy, że do niego dotrze',
    'Zostałeś przemocą wygoniony do lasu. Myślisz, że kołyszące się drzewa szepczą. Mówisz, krzyczysz na drzewa, atakujesz je.',
    'Klątwa sprawia, że dzielisz koszmary innych ludzi. Śpisz jak najdalej od nich',
    'W stanie wojny z krukowatymi. Żadnego kontaktu bez przemocy. Nosisz procę',
    'Po śnie, w którym ujrzałeś podziemną świątynię zapomnianego boga, rozumiesz pieśni owadów i robaków',
    'Jesteś śledzony i obserwowany przez golema po przystaniu na umowę, o której wiesz, że została wymazana z twojej pamięci',
    '"Spal lub bądź spalony" to los, który akceptujesz',
    'Twoje ciało regeneruje się dwa razy szybciej, ale twoim towarzyszom dwa razy wolniej. Widzisz wielookiego "anioła stróża"'
  ]
}

const MBCorpseLoot = function () {
  // przeszukiwanie zwłok, rabowanie zwłok, corpse loot
  return {
    type: 'pickerRoller',
    list: [
      'Resztki czegoś bezwartościowego rozsypują się w twoich rękach',
      'Resztki czegoś bezwartościowego rozsypują się w twoich rękach',
      'Resztki czegoś bezwartościowego rozsypują się w twoich rękach',
      'Resztki czegoś bezwartościowego rozsypują się w twoich rękach',
      'Resztki czegoś bezwartościowego rozsypują się w twoich rękach',
      'Resztki czegoś bezwartościowego rozsypują się w twoich rękach',
      'Resztki czegoś bezwartościowego rozsypują się w twoich rękach',
      'Resztki czegoś bezwartościowego rozsypują się w twoich rękach',
      'Resztki czegoś bezwartościowego rozsypują się w twoich rękach',
      'Resztki czegoś bezwartościowego rozsypują się w twoich rękach',
      'Resztki czegoś bezwartościowego rozsypują się w twoich rękach',
      'Resztki czegoś bezwartościowego rozsypują się w twoich rękach',
      'Resztki czegoś bezwartościowego rozsypują się w twoich rękach',
      'Resztki czegoś bezwartościowego rozsypują się w twoich rękach',
      `${k(2, true)} szt. srebra`,
      `${k(4, true)} szt. srebra`,
      `${k(6)} szt. srebra`,
      `${k(8)} szt. srebra`,
      `${k(10)} szt. srebra`,
      `${k(20)} szt. srebra`,
      `${k(20)} szt. srebra`,
      `${k(20)} szt. srebra`,
      `${k(20)} szt. srebra`,
      `${k(20)} szt. srebra`,
      `${k(20)} szt. srebra`,
      `${k(20)} szt. srebra`,
      `${k(66)} szt. srebra`,
      `${k(66)} szt. srebra`,
      `${k(66)} szt. srebra`,
      `${k(100)} szt. srebra`,
      `${k(20, true)} szt. srebra`,
      'Garnuszek z niesamowicie skuteczną maścią wywołującą swędzenie',
      'Naszyjnik z ludzkich zębów',
      'Worek wściekłych, jadowitych ciem, DR6 na Twardość albo śmierć',
      `Kieszeń pełna popękanego szkła, ${k(2)} obrażeń`,
      'Szalony manifest, jeśli go przeczytasz, rzuć DR12 na Prezencję, w przypadku porażki jesteś tak zmieszany, że tracisz na stałe 1 pkt prezencji',
      'Klucz do pobliskich drzwi, kradziony',
      'Mapa domu zamożnej, choć słabej rodziny',
      'Zadziwiająca ilość pająków (martwych)',
      'Zadziwiająca ilość pająków (żywych)',
      'Zadziwiająca ilość szczurów (martwych)',
      'Zadziwiająca ilość szczurów (żywych)',
      'Metalowy cylinder wypełnionych prochem, z lontem. 1-2 tracisz rękę, 3-6 zadaje 3k10 obrażeń tam, gdzie wyląduje.',
      'Twarz znanego i znienawidzonego łowcy czarownic',
      'Twarz znanego i lubianego łowcy czarownic',
      'Kartka z listą imion Bohaterów Graczy, jedno z imion jest skreślone',
      'Umęczona wróżka z urwanymi skrzydełkami i wyłupionymi oczami',
      'Mapa do miejsca, które nie ma prawa istnieć',
      'Nieoznakowana butelka z cieczą, która mieni się raz czerwono, raz na zielono',
      'Papier dłużny, lokalny potentat jest winny posiadaczowi znaczną sumę pieniędzy.',
      '"Woda życia", leczy k8, test twardości DR10 albo ślepniesz. Wysoce alkoholowa.',
      'Maska pośmiertna jednego z BG',
      `Z tym coś było ewidentnie nie tak. Ręce ma pokryte czymś ciepławym, brązowym i mocno kwasowym. ${k(2) + 1} obrażeń i okropnie śmierdzisz przez ${k(4)} dni.`,
      'Czarny sztylet z Kergus, 2k4 obrażeń',
      'Podpisana buteleczka z trucizną, test DR12 na twardość, albo losowy atrybut spada o k4.',
      'Skalp z długimi czarnymi włosami',
      'Złota kula z niewidzialnym łączeniem, otwierana wykręcaniem',
      'Zakrwawiony kastet',
      'Dwie obciążone kości.',
      'Puchar z czaszki jakiegoś nieszczęśnika',
      'Wisiorek z ususzonej krowiej głowy wiszącej do góry nogami na rzemyku',
      'Zestaw kart tarota, dwóch brakuje.',
      `Woreczek z bladozielonymi ziołami (herbata, daje sen bez marzeń, ale redukuje prezencję o 1 następnego dnia ${k(6) + k(6)} porcji)`,
      'Żelazna obroża.',
      'Zakorkowana flaszka z bardzo silnym alkoholem',
      'Osełka',
      'Drewniana łyżka',
      'Medalion z lokiem rudych włosów.',
      'List gończy, poszukiwany winny rabunku i kradzieży, 50s żywy, 10s martwy',
      'Pierścionek z fałszywym klejnotem, skrywającym dawkę czarnej trucizny.',
      'Szmaciana lalka',
      'Puzderko z uschniętym, gnijącym palcem od stopy należącym do zwłok, ma wczesne stadium trądu.',
      `Słoik z usychającą ropuchą, niewypuszczona zginie w ciągu ${k(4)} dni`,
      'Gwizdek',
      'Suszony penis trolla',
      'Małe lusterko',
      'Łuska wielkości dłoni',
      'Złoty ząb (ma go w ustach)',
      'Srebrny medalion z wizerunkiem bazyliszka',
      'Mała szklana fiolka z laudanum',
      'Zasuszone serce',
      'Mała figurka anioła, ułamane skrzydło',
      'Złota moneta z wybitą na niej czaszką',
      'Brzytwa',
      'Fiolka Elixiru Vitalis, jedna dawka',
      'Malutki klejnot, schowany w bucie, wart 10+2k6 s',
      'Naszyjnik ze srebrnym krzyżykiem',
      'Teleskopowa luneta',
      'Kawałek suszonej ludzkiej skóry z wytatuowanym tekstem (przeklęty zwój)',
      'Resztki czegoś bezwartościowego rozsypują się w twoich rękach',
      'Kilka zgniłych jabłek.',
      'Czaszki.',
      'Dwie zakrwawione pochodnie.',
      'Grzebień z pojedyńczym siwym włosem.',
      'Flet (smakuje okropnie).',
      'Mała buteleczka wypełniona krwią.',
      'Ćwiekowany skórzany naramiennik.',
      'Połamana porcelanowa lalka.',
      'Kawałek spleśniałego chleba.',
      'Martwy czarny kot.',
      'Wędka z zardzewiałym haczykiem.',
      'Długi stryczek',
      'Czerwony kaptur i maska.',
      'Mały drewniany kuferek (pusty)',
      `${k(8)} kolorowych szklanych kulek.`,
      'Rakieta śnieżna (zamieszkana przez pająka).',
      'Olejny obraz zakapturzonego szkieleta.',
      'Wachlarz w kształcie niedźwiedziego szponu.',
      'Kunsztowna jedwabna rękawiczka',
      'Suszone mięso nietoperza.',
      'Puzderko z czaszkami wróżek, zmielone i wciągnięte pozwalają unosić się i opadać powoli przez k4 minuty',
      'Miedziany kolczyk w nosie.',
      'Dwoje oczu w słoiku.',
      `${k(6)} kości (kościanych).`,
      `${k(4)} wielkich kłów.`,
      'Wiadro latrynowe.',
      'Pęknięta harfa.',
      'Rogaty hełm.',
      'Utytłana gównem chochla.',
      'Smutna kura w klatce.',
      'Strzała, która utknęła w tarczy.',
      'Garść ludzkich zębów.',
      'Świeżo naostrzona kosa.',
      'Pusta buteleczka na perfumy.',
      'Pęczek kluczy bez zamku.',
      'Skórzana ćwiekowana kamizelka.',
      `Sakiewka z ${k(10)} srebra.`,
      'Zużyty pasek.',
      'Worek martwych szczurów.',
      `Ozłacana czaszka warta ${k(20) + 10} srebra.`,
      'But (nie pasuje).',
      `${k(10)} strzał.`,
      'Książka "Królowa Nocy".',
      'Wypchana sroka.',
      'Rzeźnicki nóż (k4)',
      `${k(20)} szt. srebra`,
      'Słoik z fermentowanymi rybami.',
      'Pułapka na myszy (1 punkt obrażeń).',
      'Czarno-biała farba do twarzy.',
      'Lniany wór z częściami ciała.',
      'Pęknięte lusterko.',
      'Długi żelazny łańcuch.',
      'Książka "Walka Czarodziejów".',
      'Zakrzywiony rytualny nóż (k4).',
      'Kolczuga, tułów ciągle w niej jest.',
      'Psia obroża z łańcuchem.',
      'Woreczek z solą.',
      'Okopcony srebrny pierścień.',
      'Proporzec z zatopionego statku.',
      'Zdarta ludzka skóra.',
      'Koc, z pchłami.',
      'Zniszczony skórzany pancerz.',
      'k4 złotych zębów wartych 10s sztuka.',
      'Kilof (k4).',
      'Obroża z amuletem w kształcie pentagramu.',
      'Zakrwawione wiertło.',
      'Modlitewnik z psalmami.',
      'Maska z ptasim dziobem.',
      'Węglowy szkic przedstawiający demona.',
      'Pół martwego psa.',
      'Ładna opaska na oko.',
      'Młotek i kilka gwoździ.',
      'Kula i łańcuch (i stopa).',
      'Ostry pogrzebacz (k4+1)',
      'Para ciepłych skarpet (namoknięte).',
      'Pudełko czarnych piór.',
      'Uszkodzone futro z wilka.',
      'Zgniłe mieso (na k2 dni)',
      'Małe pudełko z białą szklaną kulką.',
      'Kufel z igłą.',
      'Drewniane zęby.',
      'Szczęśliwy amulet.',
      'k6 pustych zwojów.',
      'Latarnia z daszkiem.',
      'Para drewnianych kajdanek.',
      'Słoik z 3 uciętymi kciukami.',
      'Zwinięta kula ludzkich włosów.',
      'Łopata (k4).',
      'Zgniatacz kciuków.',
      'Bardzo mała podkowa.',
      'Naszyjnik ze szczurzych zębów.',
      'Połowa mapy skarbów.',
      'Butelka czerwonej trucizny.',
      'Mały drewniany konik.',
      'Ciężkie żelazne obcęgi.',
      'Czarny worek z kocim sercem.',
      'Czarny worek z kocim serem.',
      'Spory kawałek węgla.',
      'Dwie ucięte dłonie.',
      'Dziecięcych rozmiarów żelazna dziewica.'
    ]
  }
}

const MBArcaneCatastrophes = function () { // arcane catastrophes magiczne katastrofy
  return {
    type: 'pickerRoller',
    list: [
      'Twoje zęby wypadają jeden po drugim. W ich miejsce wyrastają długie, łamliwe paznokcie. (Twój uśmiech jest przerażający, jedzenie jest problematyczne.)',
      'Czujesz się dobrze. Jest dobrze. (Twój narząd pokrywają krosty magicznej choroby wenerycznej. Ci, z którymi dokonasz zbliżenia giną w ciągy k4 dni, by powstać jako p-łaczące zombie, które dopadają cię w snach, zanim odnajdą cię w rzeczywistości.)',
      'Twój szkielet opanowuje nieziemska siła, która zrobi wszystko, by zabić cię i uciec. Preferuje utopienie lub ataki kłute, aby kości nie uległy uszkodzeniu. Test DR10 na siłę w sytuacjach stresujących, by uniknąć k4 obrażeń. (Gdy umrzesz, powstajesz jako zombie.)',
      'Iluzja firmamentu zostaje zdjęta, od teraz widzisz, co jest poza nią. Patrzenie w czyste, nocne niebo doprowadza cię do paraliżującego strachu',
      'Dookoła ciebie spadają płatki czarnej sadzy, którą widzisz tylko ty i szaleńcy. (Woda obrzydza cię od tej chwili. Tylko popiół, sadza lub spalone zwłoki zaspokajają twoje pragnienie).',
      'Ziemia wokół twoich nóg gnije jak mokre mięso. Zapadasz się na metr głębokości i nie jesteś w stanie wyjść bez pomocy. Do twojego ciała przywiera k4 wrzeszczących i gryzących przezroczystych dzieci o ciałach raków oraz twojej twarzy. HP 3, Morale -, Ugryzienie/szczypanie k4.',
      'Twoja skóra łuszczy się jak papier, twoje mięśnie topią się jak wosk, twoje jelita nadymają się jak balony, pękają i wylewają się z ciebie, aż wszystko co po tobie zostało to chodzący, gadający szkielet.',
      'Twoje gardło rozszczepia się, ukazując zgrzytającą zębami paszczę, która wypluwa twoje sekrety i myśli (usypia ją jedynie krew).',
      'Niebo wypacza się, a gwiazdy wirują niczym koła. Zostajesz wyrzucony jeden dzień w przyszłość, gdzie docierasz rzygając płynnym czasem, który wygląda jak parująca srebrna żółć (Nieszczęście zostaje wypełnione).',
      'Światło cię nienawidzi. Twój wzrok gasi płomienie świec, lamp, czy pochodni.',
      '(W ciągu k4 dni wstrętny kokon wyłoni się z ziemi, zrodzony zostanie z niego twój identyczny klon. Bezmyślnie czyni on krzywdę wszystkiemu, co go otacza. Dzieje się tak co kilka dni, dopóki ten skrawek ziemi nie zostanie oczyszczony wodą święconą lub ogniem.',
      'Twoje oczy płoną potwornym bólem, ciężko krwawiąc, by potem poluzować się i wypaść, pozostawiając po sobie krwawe oczodoły. Dalej przez nie widzisz, gdziekolwiek są.',
      'Ty i losowa istota w twoim otoczeniu tracicie przytomność. (Wasze dusze zostały zamienione miejscami, witaj w swoim nowym ciele).',
      'Pięć powykręcanych, kościanych ramion wyrasta z twoich pleców. Ręce są psotne, brutalne i niesamowicie okrutne.',
      'Twoja skóra blednie i zaczyna emitować chorobliwe zielonkawe światło. (Żywe istoty, które pozostają blisko ciebie powoli marnieją. Słabną, ich kości stają się łamliwe, ich zęby i włosy wypadają.)',
      'Zwój rozsypuje się w macki zbudowane z drobnego czarnego pyłu, sięgające do twoich ust i nozdrzy. Test DR14 na Odporność by uniknąć k10 obrażeń.',
      'Moc działa, ale przeznaczenie lub demoniczna siła sprawiają, że jej efekty zostają wypaczone na twoją niekorzyść.',
      'Moc przebija cię jak nóż, pożywiając się twoją duszą. Stajesz się wychudły i stale głodny. (Gdy odpoczywasz, regenerujesz tylko połowę wyrzuconych HP.',
      'Wpadasz przez Refvę do ezoterycznego wymiaru Sześciennego Fioletu, miejsca mitycznego mroku. Ściany są gładkie, opalizujące i zimne. Nad tobą szaleje nieskończone morze ognia. Aby odejść (k4): 1. Pokonaj zagadkowego Kulvana (silny goblin), który dzierży trzy bezbarwne perły. 2. Zatruj bliskiego przyjaciela kruszonym sykt-grzybem (Odporność DR16 lub -k6 HP i halucynacje). Grzyby te rosną tylko w sześcianie. 3. Sięgnij w ogień nad tobą, aby zdobyć złoty klucz. k4 z twoich palców zostaje spopielone. 4. Sześcian jest perfekcyjny i pusty. Możesz tylko czekać w doprowadzającej do szaleństwa bezkresnej ciszy, aż pojawi się następny głupiec.',
      'Być może tak właśnie będzie najlepiej. ON wynurza się z cieni. Twoje cierpienie przynajmniej będzie krótkie, gdy pożarty zostaniesz przez dwugłowego bazyliszka.',
      'Twoje stopy stają się dłońmi. Twoja czaszka znika, sprawiając, że twoja głowa jest malutka, miękka, i poruszająca się bezwładnie przy każdym ruchu. Jedzenie sprawia ci problem. Wyglądasz tak dziwnie, że wszystkie interakcje społeczne mają +6 do trudności.',
      'Uzależniasz się od zapachu magicznego pyłu, który unosi się w powietrzu po każdym użyciu zaklęcia.Czujesz przymus rzucania zaklęć (dowolnych) na początku każdej walki oraz k10 godzin po ostatnim razie. Możesz powstrzymać się zdając test DR14 na Odporność, ale ten głód nigdy cię nie opuści.',
      'Twoja skóra pęka, łuszczy się i zostaje pochłonięta przez szalejące płomienie. Twoja zbroja spala się na żużel i spada u twoich stóp. Twoja skóra nigdy się nie zregeneruje i stale pachniesz jak pieczona kiełbasa.',
      'Twoja szyja znika jakby nigdy nie istniała. Żyjesz, ale musisz nosić głowę ze sobą. Nadal musisz jeść i pić.',
      'Twoje dłonie stale wydzielają śliski, śmierdzący, półstały tłuszcz z porów. Zostawia on tłuste ślady na wszystkim, czego dotykasz i bardzo trudno go zmyć. Za każdym razem, kiedy musisz ostrożnie posłużyć się jakimś przedmiotem, masz 1/6 szansy, że go upuścisz.',
      'Za każdym razem kiedy jesz, coś dziwnego wydobywa się z twojego brzucha: 1. Podmuch wiatru. 2. Śmierdząca chmura. 3. Błyskawica. 4. Chmara motyli. 5. Jaśniejące światło. 6. Jakaś istota (wybór MG).',
      'Wnika w ciebie magiczna moc. Czujesz jak dreszcz przebiega wdłuż kręgosłupa i przez wszystkie twoje żyły. Czujesz się nieswojo i zimno i wydaje ci się, że coś wędruje pod twoją skórą. Kiedy regenerujesz HP poprzez odpoczynek, zmniejsz wynik o k2. Gdy umrzesz, twoi "goście" zaczną wylewać się z każdego z otworów twojego ciała.',
      'Słowa zwoju wnikają w twoją duszę, dając ci dostęp do jego mocy dodatkowe k4 razy dziennie, jednak czyniąc to, moc cię oślepia. Nigdy więcej nie przeczytasz żadnego zwoju, a twoja Zręczność (o ile wynosi więcej niż 0), zostaje zredukowana na stałe do 0.',
      'W miejsce twojej własnej głowy pojawia się owrzodzona głowa demona. Twoja mowa składa się od teraz wyłącznie z niezrozumiałych ryków.',
      'Zamiast docelowego zaklęcia, zwój przywołuje chmarę latających mięsożernych ryb (1hp ilość 2k6). Oblepiają one cel zaklęcia zadając 2kX obrażeń (X to liczba ryb, zaokrąglona w górę do liczby parzystej), zbroja tej istoty zostaje kompletnie zniszczona, po pożarciu jej, ryby zwracają się przeciwko tobie.',
      'Słyszysz dziwne dudnienie ze swoich trzewi, które po chwili przemija. Gdy następny raz się wypróżniasz (nocowanie w drodze, odwiedzanie karczmy), rzuć DR20 na porażka to 20 - twój wynik * k4 obrażeń',
      'Zamiast zamierzonego zaklęcia rzucasz Śmierć.',
      'Jesteś dręczony i śledzony przez szkodniki. Każde łóżko roi się od pcheł i pluskiew, szczury podążają za każdym twoim krokiem, gryzące muchy przesłaniają ci oczy.',
      'Twoja skóra powoli przekształca się w korę i wyrastają z niej małe, chorowite pędy. Twoja nowa drzewiasta fizjologia sprawia, że masz dodatkowe k2 pancerza (oprócz już noszonego), jednak wszelka niemagiczna regeneracja HP zostaje zmniejszona o połowę. Jesteś też wrażliwy na ogień.',
      'Zwój rozsypuje się w proch, tak jak k6 twoich palców.',
      'Cel twojego zaklęcia zostaje obleczony w ciemność i przekształca się w głodnego śmierci licza z innego wymiaru. Jeśli rzucałeś zaklęcie na siebie lub sprzymierzeńca - przenosisz się do krainy śmierci i bezkresnego cierpienia; otaczają cię kolosalne ociekające krwią czerwie oraz wilgotne mięsiste szkielety, twoim towarzyszom pozostaje zająć się liczem. Nie próbuj dyskutować z mieszkańcami obcego świata, ich zastępy są nieskończone i jedyne co ich obchodzi, to zaspokojenie nieustannego głodu.',
      'Twoje zęby zostają zastąpione przez łapczywe kościste ręce. Stale szczypią one i dźgają twój język o policzki. Głośno pstrykają, gdy są zadowolone z jedzenia, które spożywasz. Bardzo trudno ci się wysławiać, testy na prezencję związane z mówieniem są trudniejsze o 4.',
      `Cel zaklęcia zyskuje mutację: ${pickFromList(mutations)}`,
      `Rzucający zaklęcie zyskuje mutację: ${pickFromList(mutations)}`,
      `Losowa istota w promieniu 10 metrów zyskuje mutację: ${pickFromList(mutations)}`,
      `Wszyscy w promieniu 10 metrów robią rzut obronny, ci, którym się nie powiedzie, zyskują mutację: ${pickFromList(mutations)}`,
      'Zaklęcie zmienia cel na losową istotę w najbliższym otoczeniu',
      'Oczy rzucającego stają się czarne jak gagat i jaśnieją w nich elektryczne rozbłyski - rzucający zyskuje odporność na błyskawice.',
      'Rzucającemu wyrasta funkcjonalne oko na losowej części ciała',
      'Kości rzucającego stają się kruche, od tej chwili otrzymuje +50% obrażeń od broni obuchowej.',
      'Rzucający traci jeden poziom pod względem zdolności magicznych',
      'Od tej chwili za każdym razem, kiedy rzucający rzuci zaklęcie, z jego odbytu wypływają rzadkie fekalia',
      'Z dłoni rzucającego wyrastają 30cm rogi, działające jak sztylety',
      `Następny cios w walce, który otrzyma rzucający, zada ${k(100) + k(100)} punktów obrażeń`,
      'Ciało rzucającego wydziela oślepiający blask za każdym razem, kiedy jakiś wróg ma zaatakować z zaskoczenia',
      'Rzucający i cel zamieniają się bronią',
      `Ręka rzucającego odczepia się i atakuje losową istotę przez ${k(4)} rundy.`,
      'Zaklęcie odbija się od celu i trafia losowego członka drużyny',
      'Zaklęcie odbija się od celu i trafia losową istotę',
      `Rzucający zostaje oślepiony na ${k(6)} r.`,
      `Rzucający staje się głuchy na ${k(6)} r.`,
      'Cel trafia rzucającego (jeśli szkodliwy), wroga (jeśli pomocny), lub nie działa (jeśli neutralny).',
      'Rzucający przekształca się w losowego potwora, od teraz jest niebiezpiecznym BNem.',
      `Agonia przez ${k(6)} r.`,
      'Desperacki głód, nie może działać, dopóki nie zje 1 racji.',
      `Skóra wydziela śluz, jego zdjęcie trwa ${k(6)} r.`,
      'Od teraz: rzut obronny na początek każdego dnia, porażka oznacza, że zyskujesz losową mutację, rzut obronny na koniec dnia - porażka oznacza, że mutacja jest permanentna.',
      'Zmieniasz się w wygłodniałą chaotyczną psychoplazmę.',
      'Od teraz rzucający nie może wchodzić do miejsc uświęconych. Dotykanie srebra zadaje 1 pkt. obrażeń na rundę. Srebrna broń zadaje podwójne obrażenia.',
      'Rzucający zostaje zredukowany do 0 HP',
      'Rzucający traci zdolność do rzucania zaklęć przez 1 dzień.',
      'Rzucający traci zdolność do rzucania zaklęć przez 3 dzień.',
      'Rzucający traci zdolność do rzucania zaklęć permanentnie, potrafi walczyć tylko gołymi rękami i zębami, mówi tylko monosylabami.',
      'Pojawia się 2 metrowe lustro, do którego rzucający czuje przymus wejścia, wraca następnego dnia utraciwszy jeden przedmiot, zyskawszy jeden przedmiot o podobnej wartości i z 1hp, drżący i wystraszony.',
      `${k(6)} z pobliskich zwłok ożywa i atakuje cię przez ${k(6)} r.`,
      'Twoja dusza opuszcza ciało, rzucaj na inteligencję co godzinę, żeby znaleźć drogę z powrotem.',
      `Umierasz i spędzasz ${k(6)} z następnych dni jako bezsilny duch. Twoje ciało zacznie gnić po 2 dniach, o ile nie zostanie zakonserwowane. Jeśli zamieszkasz zgniłe ciało, staniesz się nieumarły`,
      'Stajesz się nieumarły',
      'Wszystkie zwłoki w zasięgu 20 mil powstają jako szkielety i zombie i próbują cię zabić',
      'Zmieniasz się w pająka na 1 dzień',
      'Zmieniasz się w pająka na 3 dni, żywe istoty inne niż pająki uznają cię za szczególnie odrażającego i starają się cię rozgnieść',
      'Zmieniasz się w pająka na stałe. Co tydzień robisz rzut obronny, porażka oznaza, że zapominasz 1 rok swojego dawnego życia. Żywe istoty inne niż pająki uznają cię za szczególnie odrażającego i starają się cię rozgnieść',
      'Znikasz na 1 dzień, zostaje po tobie tylko cień.',
      `Znikasz na zawsze, zostawiając po sobie jedynie wygłodniały cień: ${MBMonsters.list.find((monster) => { return monster.slice(0, 13) === 'Istota cienia' })}`,
      `Znikasz na ${k(6)} godz. przenosząc się do dziwnego świata oślepiajacych świateł i geometrycznych kształtów. Dokonujesz dziwnych czynów, pod blaskiem tysiąca gorejących gwiazd.`,
      `Znikasz na ${k(6) + k(6) + k(6)} godz. przenosząc się do dziwnego świata oślepiajacych świateł i geometrycznych kształtów. Dokonujesz dziwnych czynów, pod blaskiem tysiąca gorejących gwiazd. Wracasz z 1 HP.`,
      'Znikasz na zawsze.',
      'Znika cały twój ekwipunek, łącznie z odzieżą.',
      'Tracisz głos na jeden dzień.',
      'Od tej chwili rzucający starzeje się wstecz',
      'Ze zwoju wystrzeliwuje chaotyczna moc, losowo zmieniając treść każdego z posiadanych zwojów',
      'Ze zwoju wystrzeliwuje chaotyczna moc, spalając wszystkie posiadane przez ciebie zwoje',
      'Z twoich oczu, ust, uszu i nosa wylewa się fala czerwonych motyli, rozlatują się na wszystkie strony, zderzając się ze wszystkim, od uderzenia rozbryzgując się na krwiste plamy',
      'Ze zwoju wylewa się fala czerwonych motyli, rozlatują się na wszystkie strony, zderzając się ze wszystkim, od uderzenia rozbryzgując się na krwiste plamy'
    ]

  }
}

let MBMonsters = { // monster monsters potwory
  type: 'picker',
  list: []
}

class MBMonster {
  constructor (nazwa, HP, morale, pancerz, broń, specjalneCechy) {
    this.nazwa = nazwa
    this.HP = HP
    this.morale = morale
    this.pancerz = pancerz
    this.broń = broń
    this.specjalneCechy = specjalneCechy
  }
}

function createAndAddMonster ({ keyName, nazwa = '', HP = '', morale = '-', pancerz = '', broń = 'nieuzbrojony k2', specjalneCechy = '' }) {
  const newMonster = new MBMonster(nazwa, HP, morale, pancerz, broń, specjalneCechy)
  MBMonsters = {
    ...MBMonsters,
    ...{ [keyName]: newMonster }
  }
  MBMonsters.list.push(`${nazwa} - HP: ${HP}, Morale: ${morale}, pancerz: ${pancerz}, ${broń} ${specjalneCechy}`)
}

createAndAddMonster({ keyName: 'underpaidTiredGuard', nazwa: 'Źle opłacany, zmęczony strażnik', HP: '5', morale: '7', pancerz: 'Skóra -k2', broń: 'Prosta broń k4 lub k6', specjalneCechy: '' })
createAndAddMonster({ keyName: 'weakMindlessUndead', nazwa: 'Słaby, bezmyślny nieumarły', HP: '4', morale: '-', pancerz: 'Bezużyteczne szmaty', broń: 'Pięść k4 lub topór k6', specjalneCechy: '' })
createAndAddMonster({ keyName: 'innocentBystander', nazwa: 'Niewinny postronny', HP: '3', morale: '5', pancerz: 'brak', broń: 'Desperackie machanie k2', specjalneCechy: '' })
createAndAddMonster({ keyName: 'kobolth', nazwa: 'Kôbôlth', HP: '2', morale: '-', pancerz: 'brak', broń: 'Prowizoryczny nóż k4, test DR12 na odporność albo infekcja', specjalneCechy: '' })
createAndAddMonster({ keyName: 'duskGnoum', nazwa: 'Mroczny Gnoum', HP: '4', morale: '7', pancerz: 'brak', broń: 'Nóż k4', specjalneCechy: '' })
createAndAddMonster({ keyName: 'mongrel', nazwa: 'Masywny czarny pies ze skołtunionym futrem', HP: '8', morale: '9', pancerz: 'brak', broń: 'Ugryzienie k4+1, test DR12 na odporność albo infekcja', specjalneCechy: '' })
createAndAddMonster({ keyName: 'nestingDeath', nazwa: 'Pająk wielkości dużego psa', HP: '12', morale: '-', pancerz: 'Gruby karapaks -k2', broń: 'Ugryzienie k4, test DR12 na odporność albo zesztywnienie (testy mają +2 DR przez godzinę)', specjalneCechy: '' })
createAndAddMonster({ keyName: 'fleshEatingMonster', nazwa: 'Mięsożerny potwór', HP: '8', morale: '8', pancerz: 'Gruba skóra -k2', broń: 'Ugryzienie k4 + infekcja (2/6)', specjalneCechy: '' })
createAndAddMonster({ keyName: 'clawsEyesSpideryLegs', nazwa: 'Szpony, oczy, pajęcze nogi', HP: '12', morale: '-', pancerz: 'chityna -k4', broń: 'Szpony k6 (obrona DR14)', specjalneCechy: '' })
createAndAddMonster({ keyName: 'mutatedTombRobber', nazwa: 'Zmutowany rabuś grobowców', HP: '13', morale: '9', pancerz: 'Dziwne ciało -k4', broń: 'Długi ostry nóż k6', specjalneCechy: '' }) // daj do graven-tosk
createAndAddMonster({ keyName: 'antiArcaneLichQueen', nazwa: 'Antymagiczna królowa liczy', HP: '24', morale: '-', pancerz: 'Nekro-pole -k4', broń: 'Okkültystyczny cios k8', specjalneCechy: 'Pożera moce' }) // daj do graven-tosk
createAndAddMonster({ keyName: 'corruptedWarlord', nazwa: 'Spaczony wódz', HP: '20', morale: '11', pancerz: 'Czarny metal -k6', broń: 'Kolczasty zweihänder k10', specjalneCechy: '' })
createAndAddMonster({ keyName: 'daemon', nazwa: 'Dæmon', HP: '24', morale: '-', pancerz: 'Niczym powietrze -k8', broń: 'Dotyk entropii k6', specjalneCechy: '-2 siły/cios' })
createAndAddMonster({ keyName: 'goblin', nazwa: 'Goblin', HP: '6', morale: '7', pancerz: 'Twarda skóra -k2', broń: 'Nóż/krótki łuk k4', specjalneCechy: 'Szybki, atak i obrona DR14, jeśli nie zostanie zabity, ten kogo atakował po k6 dniach sam zmieni się w goblina. Warość: głowa 7s, złapany 150s, martwy 20s' })
createAndAddMonster({ keyName: 'scum', nazwa: 'Szumowina', HP: '7', morale: '8', pancerz: 'brak', broń: 'Zatruty nóż k4 + infekcja (DR10 Odporność)', specjalneCechy: 'BG z najwyższą prezencją robi test DR14 na początku walki, porażka oznacza, że losowy członek drużyny został trafiony podstępnym ciosem w plecy +3 do obrażeń. Wartość: złapany (winny poważnej) zbrodni 50-120s, martwy (winny poważnej zbrodni) 20-70s.' })
createAndAddMonster({ keyName: 'berserker', nazwa: 'Berserker', HP: '13', morale: '9', pancerz: 'Stwardniała skóra -k2', broń: 'k4: 1. Długi korbacz k8, ciężka buława k6, miecz na łańcuchu k6, ogromny młot bojowy k10', specjalneCechy: 'Atakuje dwukrotnie na rundę, ale nie trudzi się obroną (DR10 na trafienie). Wartość: złapany 55s, martwy 20s, krew (1l) 3s.' })
createAndAddMonster({ keyName: 'shadowCreature', nazwa: 'Istota cienia', HP: '18', morale: '10', pancerz: 'Bezcielesność -k4', broń: 'Dotyk entropii k6', specjalneCechy: '' })
createAndAddMonster({ keyName: 'wraith', nazwa: 'Upiór', HP: '15', morale: '-', pancerz: 'brak', broń: 'Dotyk k4 + wysysanie sił', specjalneCechy: 'Szybkie, ulotne i trudne do trafienia (DR14). Te bezcielesne zjawy zawsze wygrywają inicjatywę. Ich dotyk wysysa Siłę, Prezencję i Inicjatywę, zmniejszając je o 1 do końca walki. Wartość: złapany 120s, czaszka 70s, ektoplazma 25s.' })
createAndAddMonster({ keyName: 'bloodDrenchedSkeleton', nazwa: 'Krwawy szkielet', HP: '7', morale: '8', pancerz: 'brak', broń: 'Krótki miecz lub nóż k4, kościste palce k2', specjalneCechy: 'Porusza się bezgłośnie, potrafi naśladować głosy, ale tylko słowa, które słyszał. Ataki bronią kłutą mają DR14. Atak zadający 5 lub więcej obrażeń niszczy szkielet kompletnie. Wartość: złapany 35s, zniszczony 7s.' })
createAndAddMonster({ keyName: 'undeadNecromancer', nazwa: 'Nieumarły Nekromanta', HP: '15', morale: '-', pancerz: 'Nekrobariera -k4', broń: 'Cios k6', specjalneCechy: 'Paraliżujący dotyk DR14 na Prezencję, żeby się ocknąć. Co runę może wykraść zawartość pobliskiego zwoju i użyć jego zawartość przeciwko właścicielowi. Wartość: złapany 200s, zwłoki 130s, czaszka 100s.' })
createAndAddMonster({ keyName: 'troll', nazwa: 'Troll', HP: '32', morale: 'specjalne', pancerz: 'Gruba skóra -k2', broń: 'Pięść 2k6', specjalneCechy: 'Tchórz pomimo rozmiaru, mocno zraniony ucieka.Nigdy nie zapomina, kto go skrzywdził. Podczas leczenia rośnie i powraca silniejszy niż wcześniej. Wyleczone HP dodawane jest do maksymalnego. Z każdym powrotem zyskuje też k6 do obrażeń. Wartość: złapany 200s, martwy 70s, róg 25s.' })
createAndAddMonster({ keyName: 'zombie', nazwa: 'Zombie', HP: '7', morale: '-', pancerz: 'Skórzane pozostałości -k2', broń: 'Drapnięcie/Ugryzienie k2', specjalneCechy: 'Każdy kto zostanie ugryziony robi test DR8 na Odporność, porażka oznacza, że po dwóch dniach ginie i powstaje jako zombie. Wartość: złapany 30s, krew/l 5s' })
createAndAddMonster({ keyName: 'undeadDoll', nazwa: 'Nieumarła Lalka', HP: '11', morale: '-', pancerz: 'Porcelana -k2', broń: 'Szpony/przeszywające ugryzienie k4', specjalneCechy: 'Przerażające spojrzenie: test na Prezencję DR12 na początku walki, porażka oznacza paraliżujący strach przez k4 rundy. Wartość: złapana 80s, głowa 20s.' })
createAndAddMonster({ keyName: 'grotesque', nazwa: 'Gargulec', HP: '18', morale: '-', pancerz: 'Glina/kamień -k6', broń: 'Szpony k6, promień z oczu k8', specjalneCechy: 'Wtapiają się w otoczenie i ciężko je dostrzec. Poruszają się powoli i łatwo je trafić (DR10). Ich przerażający wzrok atakuje 1-2/6, zawsze trafia. Wartość: złapany 190s, martwy (cały) 100s, martwy (w kawałkach) 10s.' })
createAndAddMonster({ keyName: 'wickheadKnifeWielder', nazwa: 'Knotogłowy nożownik', HP: '10', morale: '7', pancerz: 'brak', broń: 'Nóż z zaschniętą krwią k4 - 1/4 szansy na infekcję', specjalneCechy: 'Zakrada się do wrogów, cichy jak grób. 25% szans, że jego niesamowicie brudny nóż wywoła infekcję. Potrafi magicznie zgasić wszelkie okoliczne źródła światła, zapalić własną oślepiającą lampę i zaatakować, by następnie zniknąć w ciemnościach. Wartość: złapaty 60s, zdekapitowana latarnia 15s, zwłoki 20s.' })
createAndAddMonster({ keyName: 'wyvern', nazwa: 'Wiwerna', HP: '25', morale: '10', pancerz: 'Gruba skóra -k4', broń: 'Ugryzienie/użądlenie k6', specjalneCechy: '60% szansy, że ugryzie. Jadowite żądło może sparaliżować ofiarę - test DR14 aby uniknąć bolesnej godziny paraliżu. Wartość: złapana 200s, zwłoki 100s, gruczoł jadowy 60s, kolec ogonowy 60s' })
createAndAddMonster({ keyName: 'earthbound', nazwa: 'Kundlak', HP: '8', morale: '7', pancerz: 'brak', broń: 'Laska/kość udowa k4', specjalneCechy: '' })
createAndAddMonster({ keyName: 'wildWickhead', nazwa: 'Dziki knotogłowy', HP: '10', morale: '7', pancerz: 'brak', broń: 'nóż k4', specjalneCechy: '' })
createAndAddMonster({ keyName: 'paleOne', nazwa: 'Bladawiec', HP: '5', morale: '8', pancerz: 'brak', broń: 'bezbronny k2', specjalneCechy: '50% szansy, że może raz dziennie użyć losowej mocy.' })
createAndAddMonster({ keyName: 'prowler', nazwa: 'Włóczęga', HP: '8', morale: '8', pancerz: 'Skórznia -k2', broń: 'Nóż/kość udowa k4, okazjonalnie brudny krótki miecz k4+1', specjalneCechy: '' })
// createAndAddMonster({keyName: "", nazwa : "", HP : "", morale : "-", pancerz : "brak", broń : "", specjalneCechy : ""});

function removeAllChildren (element) {
  const counter = element.children.length
  for (let m = 0; m <= counter; m++) {
    if (element.children[0]) {
      element.children[0].remove()
    }
  }
}

function randomizeFromArray (array) {
  return array[Math.floor(Math.random() * array.length)]
}

function displayArray (ar, parent) {
  for (let j = 0; j < ar.length; j++) {
    const line = document.createElement('p')
    line.innerText = `${j + 1}. ${ar[j]}`
    parent.appendChild(line)
  }
}

function pickFromList (pickedList) {
  if (pickedList.type === 'mixerSpaced') {
    const nonTypeKeys = Object.keys(pickedList).filter((key) => { return key !== 'type' })
    let combinedParts = ''
    for (let k = 0; k < nonTypeKeys.length; k++) {
      combinedParts += ` ${randomizeFromArray(pickedList[nonTypeKeys[k]])}`
    }
    return combinedParts
  } else if (pickedList.type === 'mixerConcatenated') {
    const nonTypeKeys = Object.keys(pickedList).filter((key) => { return key !== 'type' })
    let combinedParts = ''
    for (let k = 0; k < nonTypeKeys.length; k++) {
      combinedParts += randomizeFromArray(pickedList[nonTypeKeys[k]])
    }
    return combinedParts
  } else if (pickedList.type === 'picker') {
    return randomizeFromArray(pickedList.list)
  } else if (pickedList().type === 'pickerRoller') {
    // pickerRollers (e.g. random encounters, corpse loot) are functions, so that the numbers are rerolled each time
    return randomizeFromArray(pickedList().list)
  }
}

generateButton.addEventListener('click', () => {
  updatePick()
  const result = []
  const pickedCategory = eval(category)
  removeAllChildren(nameDisplay)
  for (let i = 0; i < numberGenerated; i++) {
    result.push(pickFromList(pickedCategory))
  }
  displayArray(result, nameDisplay)
})
