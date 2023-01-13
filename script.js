
// random encounters/ varied by regions - add some monsters to default, add defaults to nondefault as well
// cult generator
// make sure half the encounters are creatures
// ghoul
// add arcane catastrophes from: fatal, GURPS magic and thaumatology, Dark Heresy, WFRP, Dungeon Crawl Classics
// add animals (from travel rules)
// pale one class - have the appropriate name generators
// monsters from death temple sztun
// monsters from my owne dungeons
// elf names
// dwarf names
//those adventure prompts from mork borg rulebook

//divide MB weapons into damage classes and roll accordingly (to enable to add more weapon types)

import { MBNames, MBTowns, VOTENobleNames, wizardNames, MBPaleOneNames, MBDeadGod } from './names.js'

const generateButton = document.getElementById('generate-button')
const nameDisplay = document.getElementById('name-display')
const categoryPicker = document.getElementById('kategoria')
const numberPicker = document.getElementById('liczba')
let pickedClass = null //can also be later used as any secondary option for generating, as only one can be used at a time

const MBCharacterClassPicker = document.createElement('select')

function updateSecondarySelectStatus (){
  if (categoryPicker.value === 'MBCharacter'){   
    function addOption (displayedName, valueIfDifferent){
      let option = document.createElement('option')
      option.text = displayedName
      option.value = displayedName
      MBCharacterClassPicker.appendChild(option)
    }
      document.body.insertBefore(MBCharacterClassPicker, nameDisplay)
      MBCharacterClassPicker.classList.add('input')
      addOption('Postać bezklasowa')
      addOption('Losowa klasa')
      addOption('Bladawiec')
      addOption('Ezoteryczny pustelnik')
      addOption('Hardy kowal')
      addOption('Heretycki kapłan')
      addOption('Okultystyczny zielarz')
      addOption('Prorok martwego boga')
      addOption('Przeklęta ofiara')
      addOption('Przeklęty zmiennokształtny')
      addOption('Rynsztokowa szumowina')
      addOption('Upadły arystokrata')
      addOption('Wojownik')
      addOption('Zapomniany filozof')
      addOption('Zębaty dezerter')
      addOption('Złodziej')
      MBCharacterClassPicker.addEventListener('click',()=>{
        if (MBCharacterClassPicker.value === 'Losowa klasa'){
          pickedClass = 'Losowa klasa'
        } else {
          pickedClass = MBClasses.list.find((charClass)=>{ return charClass.characterClassName === MBCharacterClassPicker.value})
        }
      })
      MBCharacterClassPicker.addEventListener('change',()=>{      
        removeAllChildren(nameDisplay)
      })
      

    } else {
      removeAllChildren(MBCharacterClassPicker)
      MBCharacterClassPicker.remove()
    }
}


categoryPicker.addEventListener('change',(e)=>{
  removeAllChildren(nameDisplay)
  updateSecondarySelectStatus ()
})

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

let MBTownEncounters = { // town encounters losowe spotkania w mieście
  type: 'picker',
  list: [
    'Mieszkańcy biorą drużynę za przepowiedzianych im zbawicieli, nie pozwolą im odejść, dopóki nie rozwiążą ich problemów.',
    'Mieszkańcy biorą drużynę za przepowiedzianych im zbawicieli, witają ich hucznie, planują ich złożyć w ofierze.',
    'Mieszkańcy biorą drużynę za poszukiwanych zbiegów.',
    'Jedna z dotychczas akceptowanych praktyk została nagle uznana za herezję. Rozzłoszczony tłum, rabowanie świątyń, ikonoklazm, egzekucje.',
    'W mieście odbywają się na porządku dziennym praktyki, które gdzie indziej uznane zostałyby za bardzo heretyckie',
    'Festiwal, wielkie święto.',
    'Ślub kogoś ważnego.',
    'W mieście panuje zaraza. Bramy są pozamykane, nikt nie może wejść ani wyjść.',
    'Bramy są pozamykane, nikt nie może wejść ani wyjść, straż nie mówi dlaczego.',
    'Miasto jest opustoszałe, wygląda tak, jakby nagle wszyscy zniknęli.',
    'Miasto jest opustoszałe, widać ślady straszliwej masakry.',
    'Ulice są opustoszałe, ludzie chowają się po domach',
    'Miasto płonie.',
    'Bijatyka na rynku.',
    'Zawody.',
    'Cyrk.',
    'Polowanie na czarownice. Każdy, kto ma przy sobie przeklęty zwój, mistyczne znaki lub biżuterię, jakiekolwiek mutacje, zostaje zaatakowany przez rozwścieczony tłum.',
    'Społeczność Zapobiegania Apokalipsie werbuje ochotników.',
    'Kultysta krzyczy i nagabuje.',
    'Władze miasta są wynoszone na widłach.',
    'Wybory.',
    'Zjazd zielarzy.',
    'Budowana jest jakaś budowla.',
    'Składanie ofiary',
    'Okres wylęgu żab. W mieście jest plaga żab.',
    'Okres wylęgu szczurów. W mieście jest plaga szczurów.',
    'Powódź.',
    'Defilada wojskowa',
    'W mieście poczyna sobie złośliwie ktoś wysoko postawiony (arystokrata, wysoki duchowny, krewny Króla Cieni). Nikt nie śmie mu się postawić.',
    'Wojsko ściąga ze wszystkich brutalnie brutalne podatki i daniny.',
    'Wyczerpany przewoźnik zwłok kieruje się na cmentarz z pełnym ładunkiem.',
    `Szlachcice, w liczbie ${k(4)}, przechadzają się, okładając osoby niższych stanów pozłacanymi pałami.`,
    'Podróżujący handlarz zielskiem pytający o drogę do Wróżbity',
    'Uliczny bachor wymalowuje na ścianie napis "Słuchajcie!" kozią krwią',
    'Mija was wóz/barka ze odpadami. Smród jest nie do wytrzymania.',
    'Melancholijne melodie od spłukanego, głodującego rynsztokowego barda.',
    'Na ulicy leży trup. Nawet psy nie zwracają na niego uwagi.',
    'Na rogu ulicy umiera biedne dziecko. Zagubione, zmarznięte i samotne.',
    'Nagła kakofonia skrzydeł i krakania. Stado wron.',
    'Silne deszcze. Na ulicach pusto, ludzie szukają schronienia.',
    'Sprzedawca ryb próbuje odgonić stado kotów.',
    'Procesja zamaskowanych biczowników. Klątwy i krzyki.',
    'Dekadenccy akrobaci, odurzeni i nieostrożni. Prawie łamią sobie karki.',
    'Rodzina desperacko próbuje odbudować swoją ruderę',
    'Stary mężczyzna stoi oparty o ściane. Sapie, łapie się za serce.',
    'Pozbawiony nadziei, przygnębiony rolnik gapi się w niebo. Wszystko stracił.',
    'Młody głupiec o złamanym sercu szuka pocieszenia u ulicznych szumowin.',
    'Wielki ładunek śmieci rozbryzguje się na ulicy, wyrzucony z okna.',
    'Starsza kobieta leży w rynsztoku. Ktoś ukradł jej kulę.',
    'Pijany urzędnik zatacza się, przewraca. Wszędzie lecą zwoje i mapy',
    'Odziani w łachmany ludzie biją się o kawałek chleba. Strażnicy przyglądają się i robią zakłady.',
    'Robotnicy zanoszą trumnę wielkości łodzi anonimowemu kapłanowi',
    'Stolarz bez grosza (lub ktoś za niego się podający) próbuje sprzedać mocno zużytą kulę.',
    'Klient brutalnie wyprowadzany z karczymy. Potem obrabowany. Potem zadźgany.',
    'Piszczący rój szczurów przetacza się przez ulicę.',
    'Grupa utytłanych szymowin gra w Trzy Trupie Czaszki obciążonymi kośćmi.',
    'Nagle bełt od kuszy uderza w pobliskie drzwi. Ktoś ćwiczy.',
    'Tuż za rogiem stoi ogromne drzewo z tuzinem powieszonych heretyków.',
    'Dwadzieścioro osób ogrzewa się przy ognisku. Jest wśród nich szpieg z Griftu.',
    'Ludzie trzymają się z daleka od wściekłego psa grzebiącego w śmieciach.',
    'Trzech zatwardziałych najemników ciągnie martwego trolla przez ulicę.',
    'Skacowany kapelan przeklina stan rzeczy.',
    'Zapach suchej tabaki, ziół i haszu z zatłoczonego targowiska.',
    'Dwie małpy zjadają pozostałości martwego kruka.',
    'Eksplozja! Dym i krzyki wydobywają się ze zrujnowanego warsztatu alchemika.',
    'Demagog wykrzykujący o fałszywych proroctwach. Strażnicy są już w drodze.',
    'Załamany, bezoki chłop w dybach. Błaga o wodę.',
    'Wyeksploatowana, zardzewiała gilotyna jest naprawiana i czyszczona.',
    'Okultysta układa miedziane monety w misterne wzory.',


  ]
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
      'Dręczy was rój nietoperzy. Zjadają one racje żywnościowe, żują wasze ubrania. Jeśli uda się zabić, któregoś z nich, zobaczycie, że całe są pokryte malutkimi marynarskimi tatuażami.',
      'Procesja obdartych ze skóry biczowników.'
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
    'Bezlitosny',
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
    'Naiwny, uwierzy nawet w najmniej wiarygodne kłamstwo',
    'Hedonista',
    'Skąpy',
    'Uparty'
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
    'Przewlekła grzybica stóp. Śmierdzi',
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
    'Nie użyje żadnego ostrza nie przetestowawszy go uprzednio na własnym ciele. Ręce poprzeszywane blizami',
    'Jak już zacznie pić, nie może przestać',
    'Uzależniony od hazardu. Musi zakładać się choć raz dziennie. Jeśli przegra, podbija stawkę i zakłada się znów',
    'Nie toleruje krytyki. Rezultatem jest wściekłość i płacz',
    'Nie może przejść do sedna. Nigdy nie opowiedział żadnej historii od początku do końca',
    'Najlepszym przyjacielem jest czaszka. Nosi ją ze sobą, opowiada jej wszystko, nikomu innemu nie ufa bardziej',
    'Dłubie w nosie aż do krwi',
    'Histerycznie śmieje się z własnych żartów, które potem szczegółowo objaśnia',
    'Nihilista, upiera się, żeby mówić wszystkim, że jest nihilistą i wyjaśniać dlaczego',
    'Notoryczny zjadacz robali',
    'Na stres reaguje strojeniem się. Im gorzej sprawy się mają, tym szykowniej musi wyglądać',
    'Stale zalegająca w gardle flegma. Nieustannie kaszle, smarka, spluwa i przełyka',
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
    'Przywłaszcza sobie wszelkie zasługi', // ok
    'Zbiera trofeum z każdego zabitego wroga.'
  ]
}

const MBTroublingTales = {
  // troubling tales, troublingtales, niepokojące historie
  type: 'picker',
  list: [
    'Poszukiwany za pozbawienie życia. Jest nagroda',
    'Ogromne długi. Twój dług jest sprzedawany coraz bardziej bezlitosnym grupom.',
    'Posiada rzadki, pożądany przez wielu, przedmiot.',
    'Ma przeklętą ranę, która nigdy się nie goi.',
    'Miał nielegalny, niemoralny i sekretny romans z członkiem rodziny królewskiej. Ma na to dowód.',
    'Zbiegły kultysta. Przerażony i paranoidalny. Inni kultyści są wszędzie.',
    'Złodziej tożsamości, który niedawno zabił i zastąpił tę osobę',
    'Wygnany i wydziedziczony za nieokreślone przewinienia. Nigdy nie może wrócić do domu.',
    'Zdezerterował z wojska po tym, jak był świadkiem masakry. Jest nagroda za jego głowę. Polują na niego dawni towarzysze.',
    'Bardzo niedawno zamordował bliskiego krewnego. Bardzo niedawno',
    'Sześcian-układanka został skalibrowany niewłaściwie (a może właśnie właściwie?), budząc śpiącą abominację.',
    'Złe istoty kochają twój zapach i są do niego przyciągane, sprowadzając nieszczęście wszędzie tam, gdzie się udasz.',
    'W bitewnej ranie pozostał fragment metalu, który powoli zbliża się do twojego serca. Każdego dnia jest 2% szansy, że do niego dotrze',
    'Zostałeś przemocą wygoniony do lasu. Myślisz, że kołyszące się drzewa szepczą. Mówisz, krzyczysz na drzewa, atakujesz je.',
    'Klątwa sprawia, że dzielisz koszmary innych ludzi. Śpisz jak najdalej od nich',
    'W stanie wojny z krukowatymi. Żadnego kontaktu bez przemocy. Nosisz procę',
    'Po śnie, w którym ujrzałeś podziemną świątynię zapomnianego boga, rozumiesz pieśni owadów i robaków',
    'Jesteś śledzony i obserwowany przez golema po tym jak przystałeś na umowę, o której wiesz, że została wymazana z twojej pamięci',
    '"Spal lub bądź spalony" to los, który akceptujesz',
    'Twoje ciało regeneruje się dwa razy szybciej, ale twoim towarzyszom dwa razy wolniej. Widzisz wielookiego "anioła stróża".',

    'Twoje oczy ujrzały kiedyś przedmiot, o którym jesteś przekonany, że pochodzi z innego świata i jest kluczem do ucieczki z Umierających Ziem, a co za tym idzie, uniknięcia apokalipsy',
    'Uniknął śmierci poprzez zaciągnięcie potwornego długu.',
    'Zdezerterował z wojska dokonaniu potwornej zbrodni. Jest nagroda za jego głowę. Polują na niego dawni przyjaciele',
    'Ledwo uniknął śmierci, teraz nawiedzają go wizje cudzego życia. Ma obsesję na punkcie odnalezienia tej osoby.',
    'Rozbitek pochodzący z zamorskiej krainy, o której nikt z żywych nigdy nie słyszał',
    'Wrobiony w przestępstwo. Nikt nie wierzy w jego niewinność.'
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
      'Czarny sztylet z Kergüs, 2k4 obrażeń',
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


let MBUncleanScroll = { //TO DO: ADD ALL SCROLLS
  type: 'picker',
  list: ['Dłonie Otwierają Południową Bramę (przeklęty zwój) - kula ognia trafia k2 istoty zadając każdej z nich k8 obrażeń',
  'Język Eris (przeklęty zwój) - wybrana przez ciebie istota jest zdezorientowana przez 10 minut',
  'Te-le-kin-eza (przeklęty zwój) - przesuwasz przedmioty do k4x4 metry przez k6 minut',
  'Lucy-ferna Lewitacja (przeklęty zwój) - unosisz się przez Skupienie +k10 rund',
  'Demon Żył (przeklęty zwój) - jedna istota dusi się przez k6 rund, tracąc k4 HP na rundę',
  'Dziewięć Purpurowych Znaków Rozplątuje Burzę (przeklęty zwój) - tworzysz k2 pioruny po k6 obrażeń każdy',
  'Metzhuotl Oślepia Twoje Oko (przeklęty zwój) - istota staje się niewidzialna przez k6 rund lub dopóki otrzyma obrażenia, atakuje i broni się z DR6',
  'Odrażający Psychopomp (przeklęty zwój) - przywołujesz (k6): 1-3 k4 szkielety, 4-6 k4 zombie',
  'Powieka Oślepia Wiatr (przeklęty zwój) - k4 istoty zasypiają na godzinę, chyba że przejdą test DR14',
  'Śmierć (przeklęty zwój) - wszystkie istory w obrębie 10 metrów tracą w sumie 4k10 HP'
]

}

let MBSacredScroll = { //TO DO: ADD ALL SCROLLS
  type: 'picker',
  list: ['Łaska Martwego Świętego (święty zwój) - k2 istoty regenerują k10 HP każda',
  'Łaska Dla Grzesznika (święty zwój) - wybrana istota dostaje +k6 do wybranego rzutu',
  'Szepty Przekraczają Wrota (święty zwój) - zadaj trzy pytania martwej istocie',
  'Egida Rozpaczy (święty zwój) - wybrana istota otrzymuje 2k6 dodatkowych HP na 10 rund',
  'Oszukane Przeznaczenie (święty zwój) - jedna istota, martwa krócej niż tydzień, zostaje ożywiona z przerażającymi wspomnieniami',
  'Bestialska Mowa (święty zwój) - możesz rozmawiać ze zwierzętami przez k20 minut',
  'Fałszywy Świt/Rydwan Nocy (święty zwój) - światło lub całkowita ciemność przez 3k10 minut',
  'Hermetyczny Krok (święty zwój) - odnajdujesz wszystkie pułapki na swojej drodze przez 2k10 minut',
  'Pochłaniające Spojrzenie (święty zwój) - k4 istoty tracą po k8 HP każda',
  'Enochiańska Składnia (święty zwój) - jedna istota ślepo podąża za pojedyńczym rozkazem'
  ]
}

const MBTabletOfOchreObscurity = {//finish this next, then add The dejection of your roots
  type: 'picker',
  list: [
    'Teoria Snów (Tablica Ochrowej Ciemności) - cel zaczyna wątpić we własną prawdziwość. Atak i obrona przeciwko niemu jest łatwiejsza o 2',
    'Całkowite Zrozumienie Materii (Tablica Ochrowej Ciemności) - naprawia lub psuje jeden przedmiot standardowego rozmiaru, normalny lub magiczny, w tym zbroję (zwiększa/zmniejsza o rangę) i broń',
    'Połączenie z Podświadomością Zbiorową (Tablica Ochrowej Ciemności) - wyczuwasz obecność żywych istot w zasięgu 20 metrów, nawet w innych pomieszczeniach',
    'Logiczne Przewidywanie (Tablica Ochrowej Ciemności) - używając Czystej Logiki możesz wydedukować naturę wszelkich pułapek lub mechanizmów w zasięgu 10 metrów lub wszelkich mocy użytych w zasięgu 20 metrów',
    'Mięso-Organiczna Speleofagia (Tablica Ochrowej Ciemności) - transmogryfikuje skałę rozmiaru dziecka w przypalone, trudne do przeżucia mięso mogące wykarmić k4 wygłodniałe osoby',
    'Zamknięta w Czasie Pneumotoksyna (Tablica Ochrowej Ciemności) - ta popękana tablica może zostać skruszona w grudkowaty pył. Wysypana na istotę zadaje k6 obrażeń - na 6 istota krztusi się i umiera. Tablica pojawia się następnego ranka w ekwipunku posiadacza. Test na Skupienie tej tablicy jest niegroźny dla użytkownika, wskazuje tylko, czy pył trafia w swój cel',
    'Indukowana Nieważność (Tablica Ochrowej Ciemności) - zapisany na tej tablicy kod dosłownie usuwa zasadnicze znaczenie istoty na k4 rundy. W tym czasie przeciwnicy nie będą jej atakować, nawet jeśli ona ich zaatakuje',
    'Strukturalna Krio-kondensacja (Zamarznięty Księżyc) (Tablica Ochrowej Ciemności) - wilgoć w powietrzu zamarza tworząc 5-metrowy most lub cała woda w zasięgu 50 metrów zamarza (z wyjątkiem znajdującej się w ciałach istot żywych)',
    'Meta-Alchemia (Tablica Ochrowej Ciemności) - użytkownik może zmienić naczynie z cieczą w jeden z następujących sposobów: zmienić ją w dwie dawki czerwonej lub czarnej trucizny, stworzyć Pogardę Vularka (pijący rzuca DR16 na Odporność, porażka sprawia, że skacze z wielkiej wysokości), zmienić truciznę w wodę lub wino',
    'Memetyczna Kognitywna Palpitacja (Tablica Ochrowej Ciemności) - niemalże niedostrzegalne ruchy ciała przekazują prostą zarazę umysłową, która sprawia, że jedna istota tańczy szaleńczo przez k4 rundy. Nie może ona atakować ani bronić się podczas tej choreomanii'
  ]
}

function returnRandomSacredOrUncleanScroll (){
  return MBUncleanScroll.list.concat(MBSacredScroll.list)
}

class MBCharacterClass {
  constructor (characterClassName, description, originLabel, origin, specialAbility, rolledAbility, numberOfRolledAbilities, agility, presence, strength, toughness, omens, scrollRule, HPdie, silverDie, silverNumberOfRolls, silverMultiplier, weaponRoll, armorRoll, secondaryOriginLabel, secondaryOrigin) {
    this.characterClassName = characterClassName
    this.description = description
    this.originLabel = originLabel
    this.origin = origin
    this.specialAbility = specialAbility
    this.rolledAbility =  rolledAbility
    this.numberOfRolledAbilities = numberOfRolledAbilities
    this.agility = agility
    this.presence = presence
    this.strength = strength
    this.toughness = toughness
    this.omens = omens
    this.scrollRule = scrollRule
    this.HPdie = HPdie
    this.silverDie = silverDie
    this.silverNumberOfRolls = silverNumberOfRolls
    this.silverMultiplier = silverMultiplier
    this.weaponRoll = weaponRoll
    this.armorRoll = armorRoll
    this.secondaryOriginLabel = secondaryOriginLabel 
    this.secondaryOrigin = secondaryOrigin
  }
}

let MBClasses = { // classes lista klas
  type: 'picker',
  list: []
}


function createAndAddClass ({characterClassName, description, originLabel, origin, specialAbility, rolledAbility, numberOfRolledAbilities, agility, presence, strength, toughness, omens, scrollRule, HPdie, silverDie, silverNumberOfRolls, silverMultiplier, weaponRoll, armorRoll, secondaryOriginLabel, secondaryOrigin}) {
  const newClass = new MBCharacterClass (characterClassName, description, originLabel, origin, specialAbility, rolledAbility, numberOfRolledAbilities, agility, presence, strength, toughness, omens, scrollRule, HPdie, silverDie, silverNumberOfRolls, silverMultiplier, weaponRoll, armorRoll, secondaryOriginLabel, secondaryOrigin)
  MBClasses.list.push(newClass)
}

createAndAddClass({characterClassName: 'Zębaty dezerter',
description: 'Masz jakichś trzydzieścioro przyjaciół, którzy cię nigdy nie zawiedli: TWOJE ZĘBY. Jesteś nielojalny, niepoczytalny, czy po prostu nie dajesz się kontrolować - sam odszedłeś z każdej grupy, która sama cię nie wykopała. Ale twój parlament zębów - ogromnych, wystających, grubych i ostrych - zawsze był twoim sprzymierzeńcem',
originLabel: 'Twoje najdawniejsze wspomnienie to ',
origin: ['spalony budynek w Sarkash. Twój dom?',
'gnijący wrak dryfujący po szarym morzu.',
'burdel w Schleswigu. Całkiem przyjemne miejsce.',
'spanie razem z psami w kącie karczmy, oczekując czyjegoś powrotu.',
'podążanie za armią we wschodnim Wästlandzie.',
'ssanie piersi wilczycy w dziczy Bergen Chrypty.'],
specialAbility: 'Niezdarny - testy zręczności są trudniejsze o 2 punkty (z wyjątkiem obrony). Analfabeta - jesteś niezdolny do odczytywania zwojów. Ugryzienie - atak DR10, k6 obrażeń. Musisz być blisko celu. 1-2 na k6, że przeciwnik uzyska atak okazyjny',
rolledAbility: [
  'Wykrzywiona Maska Potwora - wywołuje prymitywny strach u pomniejszych istot, takich jak gobliny, gnoumy i dzieci. Gdy ją nosisz, testują one morale co rundę',
  'Brązowy Bułat z Galgenbeck - śmierdzący miecz wygrzebany z wojskowego wychodka (k6 obrażeń). Gdy go dzierżysz, atak i obrona mają DR10. 1/6 szansy, że trafiony przeciwnik ulegnie gwałtownej sepsie i zginie w ciągu 10 minut',
  'Zęby Czarodzieja - cztery dziwne zęby grzechoczą w czarnym woreczku. Przed walką rzuć k6 na każdy z zębów. Każda 6 oznacza, że jeden z twoich ataków zada maksymalne obrażenia',
  'Proca Starego Sigűrda - Sigűrd był najsilniejszym człowiekiem, którego gardło przegryzłeś. Ta proca, upleciona z jego długich siwych włosów, nigdy cię nie zawiodła. 2k4 obrażeń, wymaga kamieni wielkości pięści, które na szczęście (lub nieszczęście) znaleźć można wszędzie',
  'Wiekowy Posokowiec - astmatyczny, niepoczytalny i ledwo żywy, ten zasuszony pies ma doskonały węch, który potrafi wywęszyć skarby nawet w najobrzydliwszych śmieciach. Atakuje z DR10 (ugryzienie k6), broni się z DR12. Ma 12 HP. Wpada w szał w pobliżu goblinów i berserków',
  'Podkowa Rumaka Kostuchy - wygląda zwyczajnie, ale od momentu znalezienia jej w jakiejś mrocznej krypcie jesteś przekonany, że pochodzi od konia samej Śmierci. W twoich rękach atakuje z DR10, k4 obrażeń. 1/6 szansy, że zmiażdży czaszkę, natychmiastowo uśmiercając małą lub średnią istotę. Podkowa wraca do twojej dłoni jak bumerang.'
],
agility: -1,
presence: 0,
strength: 2,
toughness: 0,
omens: 2,
scrollRule: 'illiterate',
HPdie: 10,
silverDie: false,
silverNumberOfRolls: false,
weaponRoll: false, 
armorRoll: false})

createAndAddClass({characterClassName: 'Rynsztokowa szumowina',
description: 'Nieszczęśliwa gwiazda uśmiechnęła się nad twoimi narodzinami. Bieda, przestępczość i kiepskie wychowanie nie pomogły. W tojej społeczności uczciwy zarobek nigdy nie wchodził w grze. Nie żebyś próbował, co ty jesteś, jakiś frajer? Ostry nóż i bezksiężycowa noc warte są więcej niż tydzień harówki',
originLabel: 'Niskourodzony: ',
origin: [
  'wrzucony do wozu z nawozem razem z błonami płodowymi.',
  'matka powieszona na drzewie na obrzeżach Galgenbeck, wypadłeś z jej zwłok.',
  'wychowany przez szczury w rynsztokach Griftu.',
  'kopany i bity pod stołem w piekarni w Schleswigu.',
  'zbiegły z z Tvelandzkiego sierocińca.',
  'wychowany przez banitów w ruderze na południe od Alliánsu.'
],
specialAbility: 'Skryty - testy zręczności i skupienia są łatwiejsze o 2 punkty. Gdy po raz pierwszy zdobywasz poziom, rzuć jeszcze raz na Specjalność. Na kolejnych poziomach szumowina może przerzucić jedną lub obie Specjalności.',
rolledAbility: [
  'Tchórzliwe Pchnięcie - kiedy atakujesz lekką bronią jednoręczną z zaskoczenia, rzuć DR10 na zręczność. Sukces oznacza jedno automatyczne trafienie, zadające normalne obrażenia +3',
  'Brudne Paluszki - twoje zręczne dłonie dostają się do kieszeni i otwierają zamki z testem DR8 na zręczność. Zaczynasz z zestawem wytrychoów',
  'Odrażający Smarkomiot - twoja flegma jest lepka, grudkowata i celna na niewielkie dystanse. Możesz pluć k2 razy na starcie. Rzuć test DR8 na skupienie, żeby trafić. Cel zostaje oślepiony, harczy i wymiotuje przez k4 rundy. Każdy, kto to widzi - przyjaciel czy wróg - musi zdać test na odporność by również nie zwymiotować. BG testują DR10, wrogowie DR12',
  'Oszukać Przeznaczenie - za każdym razem, kiedy zużywasz omen, jest 50% szansy, że go jednak nie zużywasz',
  'Ekskrementalnie Skryty - masz niesamowitą zdolnośc ukrywania się w brudzie i odpadach. Dostrzeżenie cię w takich warunkach wymaga testu DR16 na skupienie',
  'Unikanie Śmierci -  jesteś tak nieprzyjemny, nieważny i odrażający, że nawet Śmierć woli cię unikać. W przypadku śmierci, jeśli jest choć najmniejsze prawdopodobieństwo, że mógłbyś przetrwać, jest 50% szans, że tak się stało. Wracasz wtedy po 10 rundach z k4 HP oraz mało prawdopodobnym wyjaśnieniem swojego powrotu'],
agility: 0,
presence: 0,
strength: -2,
toughness: 0,
omens: 2,
scrollRule: false,
HPdie: 6,
silverDie: 6,
silverNumberOfRolls: 1,
weaponRoll: 6, 
armorRoll: 2}) 

createAndAddClass({characterClassName: 'Ezoteryczny pustelnik',
description: 'Kamień twej jaskini jest jednością z gwiazdami. Cisza i perfekcja. Teraz jednak chaos upadającego świata zakłóca twoje rytuały a płaszcz nocy staje się ciemniejszy niż mrok twojej jaskini. Irytujące!',
originLabel: 'Upiorne pochodzenie: ',
origin: [
  'obudził się dorosły wewnątrz rytualnego kręgu pod północnym mostem do Griftu.',
  'wyszedł pozbawiony wspomnień z jaskini w klifach Terionu.',
  'jedyne dziecko, które przetrwało incydent w Dolinie Niefortunnych Nieumarłych.',
  'umierając na zarazę w szałasie w Bergen Chrypcie, dotknąłeś czegoś z zewnątrz.',
  'zwykły człowiek, do momentu, gdy napotkał coś na ciemnej polanie w Sarkash.',
  'wychowany na samotnej wyspie na jeziorze Onda. Nikt inny nie słyszał nigdy o tej wyspie i nie możesz na nią wrócić.'
],
specialAbility: '',
rolledAbility: [
  'Mistrz Przeznaczenia - po ci mapy, skoro masz dostęp do kwintesencji przyczynowości? Znasz właściwą drogę po zdaniu testu DR8 na skupienie',
  'Księga Wrzącej Krwi - możesz odczytać księgę raz dziennie. Twój przeciwnik musi zdać test DR12 aby cię powstrzymać. Jeśli mu się nie uda, pojawi się k2 berserków-pogromców z zapomnianego wymiaru krwi. Rzuć k6: 1-4 walczą u twojego boku. 5-6 obracają się przeciwko tobie i próbują zniszczyć księgę. Po starciu powracają do swojego więzienia',
  'Mówca Prawd - dwa razy dizennie twoja mądrość, wiedza i wewnętrzny spokój mogą udzielić jasności wybranej istocie. DR jej następnego testu jest obniżone o 4',
  'Uczeń Niewidzialnego Kolegium - raz dziennie możesz przywołać k2 zwojów, które mogą zostać użyte jeden raz. Rzuć k4: 1-2 zwoje są święte, 3-4 zwoje są przeklęte. Jeśli zwoje nie zostaną wykorzystane do zmroku, obracają się w popiół',
  'Bard Nieumierających - poznałeś melodie zaświatów. Muzyka twojej harfy daje +k4 do rzutów na reakcję',
  'Jastrząb Bojowy - twój podstępny, prawie inteligentny, jastrząb jest lojalny tylko wobec ciebie. Nawet bez wspólnego języka, rozumiesz jego okrzyki, gdy czuwa, prowadzi zwiad i atakuje nieprzyjaciół. Atak/obrona DR10 (szpony/dziobanie k4), 8 HP'
],
agility: 0,
presence: 2,
strength: -2,
toughness: 0,
omens: 4,
scrollRule: 'random scroll',
HPdie: 4,
silverDie: 6, 
silverNumberOfRolls: 1,
weaponRoll: 4, 
armorRoll: 2})

createAndAddClass({characterClassName: 'Upadły arystokrata',
description: 'Ukorzony wyłącznie przed wspomnieniami twojej dawnej chwały, nigdy nie zgodziłbyś się podporządkować komuś innemu. Nie ty, szlachetna krew! (Nie żeby ci kmioci mogli zrozumieć głębię twojej rozpaczy)',
originLabel: 'Wszystko szło tak dobrze, do czasu kiedy ',
origin: [
  'twój pałac w Wästlandzie został obrócony w gruzy.',
  'twoje królestwo karawan w Tvelandzie popadło w nędzę.',
  'brat króla Fathmu IX, Zikmund, twój ojciec, został zamordowany.',
  'południowe imperium Südglans zatonęło w morzu.',
  'Anthelia zażądała daru ze szlachetnej krwi',
  'dwaj książęta zostali porwani na zachód Bergen Chrypty i zniknęli w czarnej szczelinie wschodnich stoków.'
],
specialAbility: '',
rolledAbility: [
  'Miecz Twoich Przodków - ten wspaniały i ewidentnie magiczny gadający miecz jest egzaltowany, niegodny zaufania i darzy cię cichą pogardą. Kpi z twoich porażek i jeśli zostanie wielokrotnie rozczarowany, ma 1/6 szansę, by podczas ataku "przypadkowo" razić ciebie lub twoich towarzyszy. Zadaje k6+1 obrażeń. Atak i obrona DR 10',
  '"Poltroon" (Nędzny Tchórz), Nadworny Błazen - ten praktycznie bezużyteczny, osobiście irytujący i stanowiący ciężar emocjonalny trefniś rozprasza twoich wrogów w trakcie walki. W czasie dwóch pierwszych rund ty i twoi sprzymierzeńcy macie +2 do ataku i obrony',
  'Barbarister, Niesamowity Koń - Barbarister jest magiczny, inteligentny, arogancki i próżny. Potrafi też mówić. Jeśli przekonasz go, Barbarister okazjonalnie może dodać ci +2 do testów na skupienie mających do czynienia z logiką i intelektem. Koń prawdopodobnie jest od ciebie mądrzejszy i dobrze o tym wie',
  'Giermek Hamfund - jedyną funkcją tego niesamowicie tchórzliwego sługi jest sprawowanie pieczy nad przeklętym mieczem Eurekią. Raz na starcie, jeśli Hamfunda uda się odnaleźć, Eurekia może zostać dobyta. Miecz zadaje 2k6 obrażeń, przy każdym uderzeniu rzuć k6. Jeśli wypadnie 1, giermek zostaje zabity, a Eurekia znika na zawsze',
  'Dar Wężowej Skóry - kosztowne pudełeczko z drzewa sandałowego pokryte wężową skórą. Wewnątrz znajduje się z pozoru zwykły sztylet, zawinięty w jedwab. Sztylet zadaje k4 obrażeń, ale przy wyrzucieniu 1 cel ginie natychmiastowo od śmiertelnej trucizny, którą nasączone jest ostrze',
  'Róg Schleswidzkich Lordów! - raz dziennie możesz zadąć w tę powgniataną starą trąbkę i wykonać test DR12 na skupienie. Jedna istota może wykonać następny test niezwiązany z walką jako automatyczny sukces'
],
agility: 0,
presence: 0,
strength: 0,
toughness: 0,
omens: 2,
scrollRule: false,
HPdie: 6,
silverDie: 6,
silverNumberOfRolls: 4,
weaponRoll: 8, 
armorRoll: 3})

createAndAddClass({characterClassName: 'Heretycki kapłan',
description: 'Ścigany przez Dwugłowe Bazyliszki Prawdziwej Wiary, heretyk bredzi wśród ruin, włóczy się nieskończenie po zakurzonych traktach i bezcześci katedry nocą',
originLabel: 'Przeklęte pochodzenie: ',
origin: [
  'Galgenbeck, w pobliżu katedry Dwugłowych Bazyliszków.',
  'zmasakrowany kult w Alliánsie, jedyny ocalały.',
  'krypty Griftu.',
  'ruiny świątyni w Dolinie Niefortunnych Nieumarłych.',
  'jeden z wielu złodziejskich tunelów w Graven-Tosk.',
  'sekretny kościół w Bergen Chrypcie.'
],
specialAbility: 'Może używać Mocy odziany w średnią zbroję',
rolledAbility: [
  'Święty pastorał - zakończony hakiem z ludzkiej kości pokrytym zachodzącymi na siebie antymodlitwami. Ten żezł zahacza o inne światy. Zadaje 2k4 obrażeń każdemu, oprócz ludzi pozbawionych wiary',
  'Kradziona mitra - doczesne ciało noszącego tę świętą czapkę zanika, stając się trudne do trafienia w walce (obrona DR10). Naciągnięta na uszy poza walką sprawia, że kapłan staje się prawie niewidzialny, testujac na ukrywanie z DR8',
  'Lista grzechów - długi i precyzyjny dokument, weryfikowany z rzeczywistością by odkryć niewidocznych złoczyńców. Zdany test DR10 na prezencje sprawia, że dziwne światło otacza złe istoty. Właściciel listy broni się przed takim wykryciem z modyfikatorem +2',
  'Bluźniercza Biblia Nechrubela - tak niesamowicie bluźniercza, że nawet sam kapłan może ją czytać tylko raz dziennie. Rzuć kością: wynik parzysty - przez resztę dnia bohaterowie graczy leczą k4 HP już po pięciu minutach odpoczynku, wynik nieparzysty - kapłana nawiedzają demoniczne halucynacje. MG może wymyślić k3 rzeczy, które tylko kapłan widzi i opisać je graczowi jak prawdziwe. Efekt przemija wraz ze świtem.',
  'Kamienie ze świątyni Thel-Emasa - rzuć kamienie na ziemię. Ich ułożenie pokazuje, czy niebezpieczeństwo czyha w pobliskim pomieszczeniu. Kamienie mogą kłamać. Kapłan robi test DR10 aby sprawdzić czy mówią prawdę, ale po porażce nie może testować ponownie do zachodu słońca',
  'Krucyfiks (Nie Ten Jezus) - tego krucyfiksu można użyc w starciach z nieumarłymi, jak również pomniejszymi trollami czy goblinami. Rzuć na morale (stosując modyfikator do skupienie kapłana), aby sprawdzić, czy istoty wycofają się z pokornym ukłonem'
],
agility: 0,
presence: 2,
strength: -2,
toughness: 0,
omens: 4,
scrollRule: false,
HPdie: 8,
silverDie: 6,
silverNumberOfRolls: 3,
weaponRoll: 8, 
armorRoll: 1})

createAndAddClass({characterClassName: 'Okultystyczny zielarz',
description: 'Zrodzony z grzyba, wychowany na polanie, zajrzał w oko księżyca odbite w srebrnoczarnym stawie',
originLabel: 'Pochodzi z ',
origin: [
  'cichego odosobnienia, jakie zapewnia mrok Sarkash.',
  'cichego odosobnienia, jakie zapewnia mrok Sarkash.',
  'cichego odosobnienia, jakie zapewnia mrok Sarkash.',
  'nielegalnych nocnych targowisk Schleswigu.',
  'heretyckiej wyspy Crëlut, dwie mile morskie na wschód od Griftu.',
  'małej wiedźmiej chatki w Galgenbeck',
  'starych zamarzniętych ruin niedaleko Alliánsu.',
  'ruin posiadłości Króla Cieni, gęstych od wspomnień grzybów i dymu.'
  
],
specialAbility: 'Przenośne laboratorium - bez przerwy zbierasz i stale zużywasz różne składniki, każdego dnia masz dośc materiałów do stworzena dwóch losowych wywarów (w sumie k4 dawki). Niewykorzystane tracą swoje właściwości po 24 godzinach',
rolledAbility: [''],
agility: 0,
presence: 0,
strength: -2,
toughness: 2,
omens: 2,
scrollRule: false,
HPdie: 6,
silverDie: 6,
silverNumberOfRolls: 2,
weaponRoll: 6, 
armorRoll: 2})

createAndAddClass({characterClassName: 'Przeklęty zmiennokształtny',
description: 'Powinieneś był umrzeć, ale coś złapało twoją duszę, gdy tonęła ona w rzece Śmierci i scaliło ją na powrót z twoim śmiertelnym ciałem. Tylko tym razem, nie jest to wyłącznie twoja klatka - w prądach zaświatów, twoja dusza wymieszała się z inną umierającą istotą. Teraz jesteś przepołowiony. Wiedziesz podzieloną egzystencję, zwarty w wiecznych zmaganiach człowieka z bestią. Powinieneś był umrzeć',
originLabel: 'Zginąłeś ',
origin: [
  'trzymając ciało ukochanej osoby w ramionach.',
  'od strzały, która przebiła twój mózg.',
  'kilka minut po narodzinach',
  'zabity ręką przyjaciela.',
  'zamordowany w swoim łóżku.',
  'na wozie wiozącym ofiary zarazy.'
],
specialAbility: 'Możesz świadomie ulec staraniom swojej drugiej strony i zmienić swoją anatomię na jej wzór. Przemieszczenie kości wymaga jednej bolesnej runy. Twoja zwierzęca forma prawdopodobnie nie jest w stanmie używać broni ani pancerza',
rolledAbility: [
  'Morderczy szczur: malutki - testy na zręczność, w tym obrona, mają DR8, twoje ugryzienie (k4) niesie chorobę - test DR 14 na skupienie, w przypadku porażki cel atakuje swojego sprzymeirzeńca do momentu śmierci któregoś z nich',
  'Obdarty ze skóry i kapiący wilk: zaciekły - ataki mają DR10, twoje kły (k6) - zadają obrażenia krytyczne również przy naturalnym 19 i prowokują test na morale, śliski od krwi - redukcja obrażeń -k2',
  'Czaszkogłowy kruk: szybki i latający - obrona ma DR10, wykonuje dwa ataki szponami (k4) na rundę, twoja koścista głowa działa jak broń i tarcza - redukcja obrażeń o -1, możesz zignorować całe obrażenia z jednego ataku. Czaszka zrasta się po k6 dniach',
  'Niedźwiedź z Bergen Chrypty: ciężki i masywny - testy na siłę, odporność i ataki mają DR10, obrona ma DR14, gruba skóra - redukcja obrażeń k4, szpony i ugryzienie zadają k8 obrażeń',
  'Jaszczurka życia i śmierci: regeneruje k4 HP na rundę, gryzie (k6) i pluje kwasem (k4, 1/4 szansa że obniży pancerz o 1 poziom), łuskowata skóra - redukcja obrażeń -k2',
  'Prorokująca zagładę małpa: zręczna - testy na zręczność, w tym obrona, mają DR10, może używać lekkiej broni oraz zbroi, twoje trzecie oko pozwala ci czytać przeklęte zwoje z DR10'
],
agility: 0,
presence: -2,
strength: 1,
toughness: 1,
omens: 2,
scrollRule: false,
HPdie: 8,
silverDie: 6,
silverNumberOfRolls: 2,
weaponRoll: 6, 
armorRoll: 2})

createAndAddClass({characterClassName: 'Bladawiec',
description: 'Czaisz się na skrajach osad, może i oceniając, ale rzadka wchodząc w interakcje. Jesteś fundamentalnie odmienny i nigdzie nie przynależysz. Miewasz napady niezrozumiałego szaleństwa i samodestrukcyjnego gniewu, ale głównie czekasz na nieuniknione w samotnej rezygnacji',
originLabel: 'Niewypowiedziane pochodzenie: ',
origin: [
  'wyłowiony z Nieskończonego Morza przez rybaków.',
  'przypadkowo przywołany przez kultystów w Graven-Tosk.',
  'wyrzygany przez wstrętną bestię w Bergen Chrypcie.',
  'spadł z nieba w pobliżu Alliánsu.',
  'wykluł się z jaja złożonego przez bagienną babę na Wästlandzkim mokradle.',
  'wypełzł z pęknięcia w ziemi w pobliżu Griftu.'
],
specialAbility: 'Jesteś piśmienny, ale tylko w martwych językach i nie możesz używać zwojów. Potrafisz jednak intuicyjnie użyć jednej Mocy dziennie, losowanej o zmierzchu lub o świcie (wybierz sobie).',
rolledAbility: [
  'Gwiazdy miały rację - rzucasz k4+2 na omeny. Powiedz coś tajemniczego za każdym razem, gdy wykorzystujesz jeden z nich',
  'Błoniaste skrzydła - potrafisz latać krótkie dystanse, ale nie możesz nosić zbroi. Ptaki cię nie lubią',
  'Niepospolita glina - potrafisz czerpać odżywienie z gleby, ale normalne jedzenie cię obrzydza. Pachniesz grzybami',
  'Manna skądś - możesz wydać swój zapas mocy aby stworzyć dziwnie smakowitey, choć niepokojący, pokarm dla k6 osób',
  'Giętkie kończyny - potrafisz wydostać się z wszelkich więzów i przecisnąć się przez malutkie przestrzenie. -4 DR do testów na gibkość',
  'Zbyt wiele oczu - po prostu za dużo. Nie możesz zostać zaatakowany z zaskoczenia. Możesz wyrzec się na dany dzień mocy, aby zostawić za sobą jedno z oczu i patrzeć przez nie na odległość (jeśli oko zostanie zniszczone, otrzymujesz k2 pkt. obrażeń)'
],
agility: 1,
presence: 1,
strength: 0,
toughness: -2,
omens: 4,
scrollRule: 'illiterate',
HPdie: 6,
silverDie: 6,
silverNumberOfRolls: 1,
weaponRoll: 6, 
armorRoll: 2})

createAndAddClass({characterClassName: 'Prorok martwego boga',
description: 'Głosy w twojej głowie mówią ci, co masz robić - a przynajmniej tak myślisz. Jesteś prorokiem boga zabitego przez Bazyliszka, JĄ, pośród podłych wierzchołków Bergen Chrypty. Nikt nie chce słuchać słów twojego boga, ale ty nadal je słyszysz. Dzień i noc. Jak rozgrzane kable oplatające twój mózg',
originLabel: 'Twój bóg to:',
origin: [`${pickFromList(MBDeadGod)}`],
specialAbility: 'Jesteś piśmienny i możesz używać zwojów, ale musisz zdać test DR12 na skupienie by powstrzymać się przed próbą zniszczenia słów fałszywych bogów. Jeśli zaczynasz ze zwojem, załóż, że automatycznie zdałeś test',
rolledAbility: [
  'Krwawe Znaki - jesteś biczownikiem, regularnie umartwiasz się, aby obudzić swojego boga. Jeśli zadasz sobie k3 obrażenia przed walką, zyskujesz +2 do liczby rzutów równej liczbie utraconych HP',
  'Władca Niczego - nosisz dziwaczną aranżację strojów i strzępów, która wygląda na parodię króla lub królowej. Zyskujesz +2 do rzutów w celu zaimponowania naiwnym',
  'Zapach Rozkładu - nie dość, że twój bóg jest martwy, odór jego gnicia przenika cię. Ten wywracający bebechy smród daje ci bonus +2 do rzutów na obronę',
  'Nieskładny Sofistyczny Bełkot - skup się, aby wygłosić pogmatwaną litanię, której słuchacze muszą zdać test DR10 na Skupienie aby nie stracić następnej akcji',
  'Posoka Zgnilizny - odrażające płyny twojego gnijącego boga wyciekają z twoich dłoni - czarne stygmaty. Możesz wytrzeć ręce w gołą skórę napastnika (jak atak z DR12), który musi wtedy zdać test DR12 na odporność, aby uniknąć spazmów i toczenia piany trwających dwie rundy',
  'Moje Ciało Naczyniem - twój bóg może i jest martwy, ale czymże jest śmierć dla boga? Raz dziennie możesz pozwolić duchowi swojego bóstwa na wypełnienie twojego ciała i wyznania prawdy w formie pytania z odpowiedzią tak lub nie, której MG musi udzielić zgodnie z prawdą. Bóg odchodzi, pozostawiając twoje ciało osłabionym',
  'W Śmierci Żyję - kiedy zginiesz, rzuć DR14 na Skupienie. Jeśli rzut się udał, twój bóg odmawia ci przejścia do zaświatów i wracasz z 1 HP. W przypadku porażki, twoje ciało zostaje pochłonięte przez święty płomień',
  'Oczy Świętego Ognia - twoje źrenice płoną duszą twojego pana. Raz na starcie możesz zaatakować (DR10), miotając ogniem ze swoich oczu (k6 obrażeń); oślepia cię to do końca trwania walki'
],
numberOfRolledAbilities: 2,
agility: 0,
presence: 2,
strength: 0,
toughness: -2,
omens: 0,
scrollRule: false,
HPdie: 4,
silverDie: 6,
silverNumberOfRolls: 1,
silverMultiplier: 5,
weaponRoll: 4, 
armorRoll: 2})

createAndAddClass({characterClassName: 'Zapomniany filozof',//tablet of ochre obscurity - add through scrollRule
description: 'Twoja droga to bezrozumny labirynt, każda świątynia skąpana we krwi, każdy cel obleczony w mrok. Kiedyś myślałeś, że chłodna analiza może ujarzmić Los, teraz to marzenie o rozumie zgniło i przeobraziło się w wirujące szaleństwo. Jedyne co pozostało, to sam chłód.',
originLabel: 'Korzenie twojego odrzucenia: ',
origin: [
  'twoja matka na zmianę chwaliła cię i upokarzała, co doprowadziło cię do wyniosłego wyobrażenia o własnej osobie i płonącej nienawiści do samego siebie.',
  'chciałeś być wojownikiem albo wielkim przywódcą, ale nie możesz! Przestać! Myśleć! DOŚĆ JUŻ TYCH MYŚLI!',
  'środowiskowa głupota i jasne światła sprawiają, że twoje nadwrażliwe tkanki mózgowe PŁONĄ ŻYWYM OGNIEM.',
  'mogłeś uratować ten przeklęty świat! Gdyby tylko te szare masy zrozumiały twój GENIUSZ!',
  'padłeś ofiarą umysłowego wirusa "miłości", po czym obiekt twojego afektu udał się, by zamieszkać w dziurze.',
  'zapisałeś swoją uniwersalną filozofię w pojedyńczym tomie dla potomnych i na własne oczy oglądałeś, jak płonie, podczas gdy uciekałeś. Wszystko jest stracone.',
  'kultyści Udoka pochwycili twoją rodzinę i zmusili cię do debatowania, podczas gdy jedli twoich rodziców żywcem.',
  'byłeś najbardziej rozchwytywanym filozofem Südglans (które zatonęło w morzu), teraz wszyscy bezlitośnie z ciebie kpią.'
],
specialAbility: 'Bezlitosna Inkwizycja - zrób test DR14 aby przejrzeć przez podstępy i złudzenia innych. Dość już tych KŁAMSTW!\n Posiadasz Tablicę Ochrowej Ciemności - relikwię zapomnianego umysłowego kultu, tak rzadką, że można ją sprzedać za 100 sztuk srebra. Tablica liczy się jako przedmiot standardowego rozmiaru. Jeśli bohater odniesie krytyczną porażkę w czasie ataku/obrony - jedna tablica pęka. Poza tym działają tak jak zwoje. Pokrywające je znaki są trudne do zrozumienia, bohater musi mieć +3 Skupienia lub być Zapomnianym Filozofem aby ich używać',
rolledAbility: [
  'Cierń Zrozumienia - gdy jest on noszony, ciernie wbijają się w twoje ciało (k2 obrażeń) i Potrzegasz Wszystko (-4DR do następnego testu i ignorujesz dwa następne ataki). Aby znowu uzyskać ten efekt, ukoronuj się ponownie. Obrażenia są za każdym razem większe (k2, k4, k6 itd.), resetuje je przespana noc',
  'Hegeliańska Sowa - ta filozoficzna bestia jest zgorzkniałym, opornym i nadwrażliwym asystentem - przekonać ją możesz testem DR12 na Skupienie. Po dwóch pomocnych akcjach obserwuje cię z cichą pogardą. Potrafi przynosić drobne przedmioty, atakować wrogów oraz znajdować pułapki. Nocą sowa zsyła ci w snach wiedzę o tym, co powinieneś był zrobić danego dnia. Hegeliańska sowa - zbyt szybka, by ją trafić. Szpony/dziobanie k4. Ataki mają DR8',
  'Pryzmat Niepewności - do jego aktywowania potrzebujesz zewnętrznego źródła światła oraz testu DR10 na Skupienie. Jego światło możesz skierować na maksymalnie dwie istoty, lecząc k6 HP. Przez następną godzinę wszystkie testy dla jednej z nich mają DR obniżone o 2. Jeśli test się nie powiedzie, otrzymują k4 obrażeń i ich broń lub zbroja zostaje zniszczona. Możesz użyć pryzmatu dwa razy na dzień',
  'Flet Tosku - raz na walkę, kiedy istota ginie, możesz zagrać na tym kościanym flecie Rozbrzmiewającą Fugę. Zadaje ona "echo" śmiertelnych obrażeń losowemu z pobliskich wrogów',
  'Szarfa Słupnika - UMYSŁ kontroluje ciało! Nic nie jest dobre ani złe, ale myślenie o tym to sprawia, tyczy się to również kalorii i protein. Noszenie tego pasa sprawia, że nie odczuwasz głodu i wystarczy, być pił wodę, aby odzyskać HP w czasie wypoczynku. Noszenie go dłużej, niż k4 dni powoduje omdlenie. Aby odzyskał moc, należy odczekać jedną dobę',
  'Naznaczony Ciemnością - stale zmieniająca się Tablica Ochrowej Ciemności jest wytatuowana na twoim ciele. Co rano wylosuj, jaka Tablica to jest. Może być użyta raz dziennie, ale jej użycie to zawsze automatyczny sukces'
],
agility: 0,
presence: 2,
strength: -2,
toughness: 0,
omens: 0,
scrollRule: 'Tablet of Ochre Obscurity',//use this rule to apply tablet
HPdie: 4,
silverDie: 6,
silverNumberOfRolls: 1,
weaponRoll: 6, 
armorRoll: 2,
secondaryOriginLabel: 'Odrzucenie twoich korzeni: ',
secondaryOrigin: [
  'wychowany przez fanatycznych teistów w świątyni pod jednym z mostów Griftu',
  'urodzony przez bezimienną matkę w galgenbeckim sanatorium',
  'wychowany przez niepiśmiennych, ciemnogrodzkich chamów w spokojnym wästlandzkim lesie',
  'wychowany na zamarzniętym pustkowiu w Kergüs przez wstydzących się życia kultystów, którzy uważali, że nikt nie powinien przychodzić na ten umierający świat',
  'opuszczony w jednej z katakumb Bergen Chrypty',
  'wykształcony przez potępionych pośród błotnych dołów Doliny Niefortunnych Nieumarłych'
]
})

createAndAddClass ({characterClassName: 'Hardy kowal',
description: '"Błogosławieni niech będą ci, którzy wykuwają żelazo, gwoździe i drut kolczasty"',
originLabel: '',
origin: [
  'Twój pan został pobity na śmierć na ulicach Galgenbeck, zaraz przed warsztatem.',
  'Byłeś pracownikiem służebnym w Kergüs, dopiero co spłaciłeś swoje długi.',
  'Bandyci płacili ci za pozbywanie się "dowodów" w twoim piecu.',
  'Wykuwałeś narzędzia tortur w Pałacu Króla Cieni.',
  'Twój terminator został porwany w biały dzień przez grupę zakapturzonych postaci.',
  'Człowiek zwany Rzeźnikiem płacił ci sowicie za haki i łańcuchy.'

],
specialAbility: 'Jesteś piśmienny, ale nie możesz używać zwojów - po co komu takie rzeczy, gdy można wykuć porządną broń?',
rolledAbility: [
  'Wykuty w Ogniu - +6 do wszystkich testów mających do czynienia z ogniem lub gorącem',
  'Niech Żyje Młot - zwykłe narzędzia, takie jak młotki, zadają w twoich rękach k6 obrażeń',
  'Szybka Naprawa - jeśli masz pod ręką jakiś złom, zrób test DR12 na Skupienie aby naprawić zbroję, porażka redukuje zbroję o kolejny poziom',
  'Cęgi - jeśli uda ci się obronić przed atakiem, 1/4 szansy na złapanie przeciwnika cęgami i zyskanie ataku okazyjnego',
  'Szczęśliwa Podkowa - działa jak bumerang, zadake k6 obrażeń',
  'Niezłomny - może naprawiać nawet zbroję zredukowaną do 0.',
  'Kolekcjoner Kości - zdaj test na Skupienie DR14 aby wykonać z kości tarczę jednorazowego użytku -k2',
  '"Znam Ten Mechanizm" - zdaj test na Skupienie DR12 aby otworzyć zamek. Porażka oznacza, że konieczny jest klucz'
],
numberOfRolledAbilities: false,
agility: -2,
presence: 0,
strength: 1,
toughness: 1,
omens: 2,
scrollRule: false,
HPdie: false,
silverDie: 6,
silverNumberOfRolls: 3,
silverMultiplier: 10,
weaponRoll: false,
armorRoll: false,
secondaryOriginLabel: false,
secondaryOrigin: false})

createAndAddClass ({characterClassName: 'Przeklęta ofiara',
description: 'Próbowali złożyć cię w ofierze dla swojej przeklętej sprawy, ale uciekłeś. Teraz jesteś zbiegiem, a zagłada ściga cię, gdziekolwiek się udasz',
originLabel: 'Jesteś naznaczony piętnem kultu, który próbował złożyć cię w ofierze. Ich sługi ciągną do znaku na twoim ciele i duszy jak ćmy do ognia. Twoim prześladowcą jest ',
origin: [
  'Kościół Dwugłowych Bazyliszków.',
  'Kult Nechrubela,',
  'Las Sarkash.',
  'Królowa Anthelia z Kergüs.',
  'Nieskończony Gon.',
  'Boska Ręka.'
],
specialAbility: '',
rolledAbility: [
  'Twój nawiedzany koszmarami sen jest tak lekki, że liczysz się jako obudzony jeśli coś wydarzy się podczas twojego snu',
  'Masz szósty zmysł jeśli chodzi o niebezpieczeństwo. Rzucaj na inicjatywę dwukrotnie, wybierz wyższy wynik',
  'Nosisz przeklętą zbroję, redukcja obrażeń -k6. Nie ogranicza ona twoich ruchów, ale nie możesz jej zdjąć, nie można więc opatrzeć twoich ran',
  'Używasz ogromnej broni, wystarczająco wielkiej, by powalić bogów. Cokolwiek to jest, zadaje k12 obrażeń, ale ataki mają DR14',
  'Zdobyłeś dziwnych sojuszników. Czymkolwiek są, mogą wyleczyć ci k6 HP w zamian za 1 omen',
  'Zastąpiłeś jedną ze swoich kończyn ukrytą bronią. Atak z DR10, by zaskoczyć wroga, zadając k10 obrażeń. Przeładowanie jest problematyczne'
],
numberOfRolledAbilities: false,
agility: 0,
presence: -2,
strength: 0,
toughness: [6, 2, 6],
omens: 2,
scrollRule: false,
HPdie: 10,
silverDie: 6,
silverNumberOfRolls: 2,
silverMultiplier: 10,
weaponRoll: false,
armorRoll: false,
secondaryOriginLabel: 'Aby zachować życie poświęciłeś ',
secondaryOrigin: [
  'kończynę lub oko',
  'swój cień',
  'swoją duszę',
  'swoje nienarodzone dziecko',
  'swoją jedyną prawdziwą miłość',
  'całą swoją rodzinną wioskę'
]
})


createAndAddClass ({characterClassName: 'Wojownik',
description: 'Jesteś wojownikiem',
originLabel: 'Gdzie poznałeś sztukę wojenną? ',
origin: [
  'Żołnierz - państwo wyszkoliło cię do walki, więc to właście robiłeś. A teraz co? Więcej walki.',
  'Strażnik - jak żołnierz, tylko nie musiałeś opuszczać miejsca zamieszkania, aby mieć możliwość wymierzać przemoc.',
  'Barowy zabijaka - upijałeś się i wdawałeś w bójki. W końcu stałeś się w tym dobry.',
  'Kowal - uderzałeś rzeczy młotami, a głowy są mniej twarde od żelaza.',
  'Łupieżca - dorastałeś w brutalnej społeczności złodziei. Walka to twoja druga natura.',
  'Inkwizytor - kościół płacił ci za bicie heretyków, było świetnie.'
],
specialAbility: 'Zabójca - jeśli swoim atakiem zredukujesz wroga do 0 HP, zadaje resztę obrażeń pobliskiemu przeciwnikowi (o ile taki jest). Klasa klasyczna - gdy po raz pierwszy zdobędziesz poziom, możesz wybrać jeden nieheroiczny atut. Możesz mieć tylko jeden atut',
rolledAbility: [''],
numberOfRolledAbilities: false,
agility: 0,//for abilities use simple modifier (positive or negative value) for more complex cases, use [die, number of dice, modifier]
presence: -2,
strength: 2,
toughness: 0,
omens: 2,
scrollRule: 'illiterate',//not actually illiterate, just doesn't start with a scroll; 
HPdie: 10,
silverDie: 6,
silverNumberOfRolls: 3,
silverMultiplier: 10,
weaponRoll: [6, 4],
armorRoll: [3, 1],
secondaryOriginLabel: false,
secondaryOrigin: false})

createAndAddClass ({characterClassName: 'Złodziej',
description: 'Jesteś złodziejem, kradniesz rzeczy. Kradniesz lepiej, niż większość. Co można jeszcze powiedzieć? Nic, bo nie gadasz ze strażnikami',
originLabel: 'Gdzie poznałeś sztukę złodziejską? ',
origin: [
  'Sierota - nie miałeś nic, prócz tego, co sobie wziąłeś, więc brałeś, co mogłeś.',
  'Szlachcic - urodziłeś się ze szlachetną krwią w twoich żyłach, ale coś się zmieniło. *Zasługujesz* na bogactwo.',
  'Niesłusznie oskarżony - odsiedziałeś raz swoje i nauczyłeś się zawodu. Nie ma co marnować swojej wiedzy.',
  'Pirat - kochałeś morze, a ono kochało ciebie. Złodziejstwo to twoja druga natura.',
  'Przypadek - nie chciałeś zostać wmieszany w przestępstwa, ale oto jesteś.',
  'Wygnaniec - musiałeś opuścić swój dom, teraz bierzesz, co musisz, by zrobić, co możesz.'
],
specialAbility: 'Uzdolniony - DR testów na Zręczność przy skradaniu wynosi dla ciebie 8. Klasa klasyczna - gdy po raz pierwszy zdobędziesz poziom, możesz wybrać jeden nieheroiczny atut. Możesz mieć tylko jeden atut. Zaczynasz z zestawem wytrychów.',
rolledAbility: [''],
numberOfRolledAbilities: false,
agility: 2,//for abilities use simple modifier (positive or negative value) for more complex cases, use [die, number of dice, modifier]
presence: 0,
strength: 0,
toughness: -2,
omens: 2,
scrollRule: false, //'illiterate' rerolls scrolls,'Tablet of Ochre Obscurity' - has tablet like philosopher, 'random scroll' 
HPdie: 6,
silverDie: 6,
silverNumberOfRolls: 4,
silverMultiplier: 10,
weaponRoll: 6,//if more complex use [die, modifier]
armorRoll: 2,
secondaryOriginLabel: false,
secondaryOrigin: false})

// createAndAddClass ({characterClassName: '',
// description: '',
// originLabel: '',
// origin: [''],
// specialAbility: '',
// rolledAbility: [''],
// numberOfRolledAbilities: false,
// agility: 0,//for abilities use simple modifier (positive or negative value) for more complex cases, use [die, number of dice, modifier]
// presence: 0,
// strength: 0,
// toughness: 0,
// omens: 0,
// scrollRule: false, //'illiterate' rerolls scrolls,'Tablet of Ochre Obscurity' - has tablet like philosopher, 'random scroll' 
// HPdie: false,
// silverDie: false,
// silverNumberOfRolls: false,
// silverMultiplier: false,
// weaponRoll: false,//if more complex use [die, modifier]
// armorRoll: false,
// secondaryOriginLabel: false,
// secondaryOrigin: false})

const classLessCharacter = new MBCharacterClass('', '', '', '', '', '', '' , 0, 0, 0, 0, 2, false)


const MBCharacter = function () { // arcane catastrophes magiczne katastrofy
  return {
    type: 'pickerRoller',
    list: [createCharacter(pickedClass)]
  }
}

function createCharacter () {
    let characterClass = pickedClass ? pickedClass : classLessCharacter
    if (pickedClass === 'Losowa klasa'){
      characterClass = pickFromList(MBClasses)
    }
    function generateAbility (modifier){
      let abilityScore = null
      let rollForAbility = null
      if (typeof modifier === "number"){
        rollForAbility = k(6) + k(6) + k(6) + modifier
  
      } else {//array [die, number of dice, modifier] 
        for (let x = 0; x < modifier[1]; x++){
          rollForAbility += k(modifier[0])
        }
        rollForAbility += modifier[2]
      }
      
      if (rollForAbility<=4){
        abilityScore = "-3"
      } else if (rollForAbility<=6){
        abilityScore = "-2"
      } else if (rollForAbility<=8){
        abilityScore = "-1"
      } else if (rollForAbility<=12){
        abilityScore = "0"
      } else if (rollForAbility<=14){
        abilityScore = "+1"
      } else if (rollForAbility<=16){
        abilityScore = "+2"
      } else {
        abilityScore = "+3"
      }

      return abilityScore
    }
    let AGI = generateAbility(characterClass.agility)
    let PRE = generateAbility(characterClass.presence)
    let STR = generateAbility(characterClass.strength)
    let TOU = generateAbility(characterClass.toughness)
    let HP = (characterClass.HPdie ? k(characterClass.HPdie) : k(8)) + parseInt(TOU)
    if (HP < 1) {
      HP = 1
    }

    let maxOmens = 2
    if (characterClass){
      maxOmens = characterClass.omens
    }
    let currentOmens = k(maxOmens)
    //weapons broń brońki bronie
    const MBWeapons = ['kość udowa (k4)', 'laska (k4)','krótki miecz (k4)', 'nóż (k4)','młot bojowy (k6)', 'miecz (k6)', 'łuk (k6, Skupienie+10 strzał)', 'kiścień (k8)', 'kusza (k8, Skupienie+10 bełtów)', 'zweihänder (k10)']
    //split into damage tiers and add different kinds with appropriate probability
    const d6Equipment = ['', '', 'plecak o pojemności 6 przedmiotów', 'worek o pojemności 10 przedmiotów', 'mały wózek', 'osiołek']

    const d12EquipmentOne = ['lina (10 metrów)', `pochodnie (${parseInt(PRE)+4} szt.)`, `latarnia i zapas oliwy na ${parseInt(PRE)+6} godz.`, 'pasek magnezji', 'przeklęty zwój', 'ostra igła', 
    `skrzynka z lekami - użycia: ${parseInt(PRE)+4} (powstrzymuje krwawienie/infekcję i leczy k6 HP)`, 'metalowy pilnik i wytrychy', 'pułapka na niedźwiedzie (Skupienie DR14 aby wykryć, k8 obrażeń)',
    'bomba (zapieczętowana butelka, k10 obrażeń)', `buteleczka czerwonej trucizny - dawki: ${k(4)} (Odporność DR12 aby uniknąć k10 obrażeń)`, 'srebrny krucyfiks']
    const d12EquipmentTwo = [`eliksir życia - dawki: ${k(4)} (leczy k6 HP i usuwa infekcję),`, 'święty zwój', `mały ale wredny pies (${k(6)+2} HP, ugryzienie k4, posłuszny tylko tobie)`,
    `małpy (${k(4)}), które ignorują cię, ale też kochają, (${k(4)+2} HP, cios/ugryzienie k4)`, 'wykwintny perfum wart 25s', 'skrzynka z narzędziami: 10 gwoździ, cęgi, młotek, mała piła i wiertło',
    'ciężki łańcuch (5m)', 'kotwiczka na linie', 'tarcza (-1 obrażeń lub zniszcz tarczę by zignorować atak)', 'łom (k4)', 'smalec (działa jak 5 posiłków)', 'namiot']

    let armors =[
      [''],
      ['futrzasta zbroja', 'przeszywanica', 'skórzana zbroja'],
      ['zbroja łuskowa', 'kolczuga'],
      ['zbroja lamelkowa', 'zbroja płytowa']
    ]

    let armorTiers = [
      'zbroja lekka, -k2 obrażeń',
      'zbroja średnia, -k4 obrażeń, DR+2 do testów zręczności, w tym obrony',
      'zbroja ciężka, -k6 obrażeń, DR+4 do testów zręczności, DR+2 do obrony'
    ]

    let d6EquipmentRoll = randomizeFromArray(d6Equipment)
    let d12EquipmentRollOne = randomizeFromArray(d12EquipmentOne)
    let d12EquipmentRollTwo = randomizeFromArray(d12EquipmentTwo)
    let additionalSpecialItem = null

    let armorRoll = null
    
    if (typeof characterClass.armorRoll  === 'number'){
      armorRoll  = k(characterClass.armorRoll ) - 1
    } else if (typeof characterClass.armorRoll  === 'boolean'){
      armorRoll  = k(4) - 1
    } else {
      armorRoll  = k(characterClass.armorRoll[0]) + characterClass.armorRoll[1] - 1
    }

    let weaponRoll = null

    if (typeof characterClass.weaponRoll === 'number'){
      weaponRoll = k(characterClass.weaponRoll) - 1
    } else if (typeof characterClass.weaponRoll === 'boolean'){
      weaponRoll = k(10) - 1
    } else {
      weaponRoll = k(characterClass.weaponRoll[0]) + characterClass.weaponRoll[1] - 1
    }


    if (armorRoll > 0){//so they won't get upgraded if they start without armor
      if (d12EquipmentRollOne === 'przeklęty zwój'){
        if (characterClass.scrollRule === 'illiterate'){
          while (d12EquipmentRollOne === 'przeklęty zwój'){
            d12EquipmentRollOne = randomizeFromArray(d12EquipmentOne)
          }
        } else {
          armorRoll = k(2)-1
          d12EquipmentRollOne = pickFromList(MBUncleanScroll)
        }
      }
      if (d12EquipmentRollTwo === 'święty zwój'){
        if (characterClass.scrollRule === 'illiterate'){
          while (d12EquipmentRollTwo === 'święty zwój'){
            d12EquipmentRollTwo = randomizeFromArray(d12EquipmentTwo)
          }
        } else {
        armorRoll = k(2)-1
        d12EquipmentRollTwo = pickFromList(MBSacredScroll)
        }
      }
    }

    if (characterClass.scrollRule === 'Tablet of Ochre Obscurity'){
      additionalSpecialItem = pickFromList(MBTabletOfOchreObscurity)
    }

    let pickedArmor = randomizeFromArray(armors[armorRoll])
    let pickedWeapon = MBWeapons[weaponRoll]
    let terribleTraitOne = pickFromList(MBTerribleTraits)
    let terribleTraitTwo = pickFromList(MBTerribleTraits)
    while (terribleTraitTwo === terribleTraitOne){
      terribleTraitTwo = pickFromList(MBTerribleTraits)
    }
    let numberOfRolledAbilities = characterClass.numberOfRolledAbilities ? characterClass.numberOfRolledAbilities : 1
    let rolledAbilities = characterClass.rolledAbility ? randomizeFromArray(characterClass.rolledAbility) : false

    if (numberOfRolledAbilities > 1){
      for (let i=1; i < numberOfRolledAbilities; i++){
        let newRolledAbility = randomizeFromArray(characterClass.rolledAbility)
        while (newRolledAbility === rolledAbilities){
          newRolledAbility = randomizeFromArray(characterClass.rolledAbility)
        }
        rolledAbilities+= `. ${newRolledAbility}`
      }
    }

    let silverMultiplier = characterClass.silverMultiplier ?  characterClass.silverMultiplier : 10

    let silver = (k(6)+k(6))*silverMultiplier
    if (characterClass.silverDie){
      let silverCounter = 0
      for (let i=0; i < characterClass.silverNumberOfRolls; i++){
        silverCounter+=k(characterClass.silverDie)
      }
      silver = silverCounter*silverMultiplier
    }
    let additionalStartingScroll = (characterClass.scrollRule === 'random scroll') ? randomizeFromArray(returnRandomSacredOrUncleanScroll()) : false
    const createdCharacter = `${(characterClass.characterClassName === 'Bladawiec') ? pickFromList(MBPaleOneNames) : pickFromList(MBNames)}. ${characterClass.characterClassName ? `${characterClass.characterClassName}.` : ''} HP: ${HP}/${HP} Omeny ${currentOmens} (k${maxOmens}).
    ${characterClass.description ? `${characterClass.description}. ${characterClass.originLabel}${randomizeFromArray(characterClass.origin)}\n` : ''}${characterClass.secondaryOriginLabel ? `${characterClass.secondaryOriginLabel}${randomizeFromArray(characterClass.secondaryOrigin)}.\n` : ''}\n${terribleTraitOne}. ${terribleTraitTwo}. ${pickFromList(MBBrokenBodies)}. ${pickFromList(MBBadHabits)}.
    Atrybuty: zręczność: ${AGI}, skupienie ${PRE}, siła ${STR}, odporność ${TOU}.\n ${characterClass.specialAbility ? `\n${characterClass.specialAbility}.` : ''}${additionalSpecialItem ? `\n\n${additionalSpecialItem}.\n` : ''}${rolledAbilities ? `\n ${rolledAbilities}. \n` : ''}
    Ekwipunek: manierka, racje żywnościowe (${k(4)}), ${pickedWeapon}, `+
    `${pickedArmor ? `${pickedArmor} (${armorTiers[armorRoll-1]}), ` : ''} ${d6EquipmentRoll ? `${d6EquipmentRoll}, ` : ''}${d12EquipmentRollOne}, ${d12EquipmentRollTwo}, ${additionalStartingScroll ? `${additionalStartingScroll}. ` : ''}${silver} szt. srebra.`
    
    return createdCharacter
}


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

updateSecondarySelectStatus()