import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { respuestaTopHeadLines } from '../interfaces/interfaces';


const apiKey = environment.apikey;
const apiUrl = environment.apiUrl

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;
  categoriaActual = '';
  categoriaPage = 0;

  // Como no funciona la api en produccion harcodeo las noticias para poder probar.
  noticiasHarcodeo = [
    {
    "source":{
    "id":null,
    "name":"Yahoo Entertainment"
    },
    "author":"Bloomberg News",
    "title":"China Stocks Rally as Beijing Intensifies Effort to Calm Market - Yahoo Finance",
    "description":"(Bloomberg) -- Stocks in China and Hong Kong jumped Thursday, after authorities intensified efforts to calm fears about a crackdown on the private education ...",
    "url":"https://finance.yahoo.com/news/china-stocks-rally-beijing-intensifies-060155877.html",
    "urlToImage":"https://s.yimg.com/uu/api/res/1.2/rj6t80_S2TrIUKm7BfRotw--~B/aD0xMzM0O3c9MjAwMDthcHBpZD15dGFjaHlvbg--/https://media.zenfs.com/en/bloomberg_markets_842/3d7bbf7127ce855f80ea53f0b34efd61",
    "publishedAt":"2021-07-29T08:55:02Z",
    "content":"(Bloomberg) -- Stocks in China and Hong Kong jumped Thursday, after authorities intensified efforts to calm fears about a crackdown on the private education industry and as the central bank pumped li… [+4396 chars]"
    },
    {
    "source":{
    "id":"the-washington-post",
    "name":"The Washington Post"
    },
    "author":"Rachel Pannett",
    "title":"890 million-year-old fossils may be oldest sign of animal life on Earth, Canadian geologist says - The Washington Post",
    "description":"“If we’re going to find early animals, it seems reasonable that they’re going to be sponge-like,” geologist Elizabeth Turner says.",
    "url":"https://www.washingtonpost.com/world/2021/07/29/fossils-canada-sponge-animals/",
    "urlToImage":"https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/HS7464HPWQI6XANSTNYGDJMC3A.jpg&w=1440",
    "publishedAt":"2021-07-29T07:53:23Z",
    "content":"Recently, she went back to collect more samples and aided by present-day advances in the study of far more modern sponges, which are simple aquatic animals with dense yet porous skeletons she became … [+3183 chars]"
    },
    {
    "source":{
    "id":null,
    "name":"New York Times"
    },
    "author":"Derrick Bryson Taylor",
    "title":"8.2-Magnitude Earthquake Off Alaska Prompts Tsunami Warning - The New York Times",
    "description":"In Kodiak, where the earthquake could be felt, tsunami sirens blared and people began moving to higher ground.",
    "url":"https://www.nytimes.com/2021/07/29/us/alaska-earthquake-tsunami-warning.html",
    "urlToImage":"https://static01.nyt.com/images/2021/07/29/world/29xp-tsunami/29xp-tsunami-facebookJumbo.jpg",
    "publishedAt":"2021-07-29T07:50:42Z",
    "content":"In Alaska, just before midnight local time, a buoy near Sand Point measured a rise in water level of about six inches. Another near Old Harbor on Kodiak Island measured just over eight inches.\r\nA tsu… [+549 chars]"
    },
    {
    "source":{
    "id":"cnn",
    "name":"CNN"
    },
    "author":"Aya Elamroussi, CNN",
    "title":"Some people in Missouri are getting vaccinated against Covid-19 in secret for fear of backlash from loved ones who oppose the vaccines, doctor says - CNN",
    "description":"The Covid-19 vaccine has become so polarizing that some people in Missouri are getting inoculated in secret for fear of backlash from their friends and family who oppose vaccination, a doctor told CNN Wednesday.",
    "url":"https://www.cnn.com/2021/07/29/health/vaccines-in-secret-missouri/index.html",
    "urlToImage":"https://cdn.cnn.com/cnnnext/dam/assets/210729010825-dr-priscilla-frase-super-tease.jpg",
    "publishedAt":"2021-07-29T07:46:00Z",
    "content":"(CNN)The Covid-19 vaccine has become so polarizing that some people in Missouri are getting inoculated in secret for fear of backlash from their friends and family who oppose vaccination, a doctor to… [+2988 chars]"
    },
    {
    "source":{
    "id":"the-verge",
    "name":"The Verge"
    },
    "author":"Jon Porter",
    "title":"Bang & Olufsen launches its first pair of noise-canceling true wireless earbuds - The Verge",
    "description":"Bang & Olufsen’s Beoplay EQ is the Danish audio brand’s first pair of noise-canceling true wireless headphones. They cost $399 (£359 / €399) and are releasing globally on August 19th in black and gold.",
    "url":"https://www.theverge.com/2021/7/29/22594086/bang-olufsen-beoplay-eq-true-wireless-earbuds-price-release-date-features",
    "urlToImage":"https://cdn.vox-cdn.com/thumbor/RSj14KSzspNh46UHVsDzQ8ldTdk=/0x411:5735x3414/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/22740501/Beoplay_EQ_0006.png",
    "publishedAt":"2021-07-29T07:00:00Z",
    "content":"The Beoplay EQ will be available in August for $399\r\nThe Beoplay EQ are available in gold (pictured) and black.\r\nImage: Bang and Olufsen\r\nBang & Olufsens Beoplay EQ are the Danish audio brands fi… [+1630 chars]"
    },
    {
    "source":{
    "id":"cnn",
    "name":"CNN"
    },
    "author":"Megan C. Hills, CNN",
    "title":"Remember when Ben Affleck gave J.Lo a gigantic pink diamond engagement ring? - CNN",
    "description":"In 2002, Ben Affleck stunned the entertainment world -- and bucked the era's jewelry trends -- when he proposed to then-girlfriend J.Lo with a 6.1-carat pink diamond engagement ring.",
    "url":"https://www.cnn.com/style/article/jlo-ben-affleck-engagement-ring/index.html",
    "urlToImage":"https://cdn.cnn.com/cnnnext/dam/assets/210728004551-01-jlo-ben-affleck-engagement-ring-super-tease.jpg",
    "publishedAt":"2021-07-29T06:59:01Z",
    "content":"luxury\r\nDelving into the archives of pop culture history, \"Remember When?\" is a CNN Style series offering a nostalgic look at the celebrity outfits that defined their eras.\r\nIn the early 2000s, it wa… [+4383 chars]"
    },
    {
    "source":{
    "id":"reuters",
    "name":"Reuters"
    },
    "author":"Echo Wang,David French",
    "title":"Robinhood, gateway to 'meme' stocks, raises $2.1 billion in IPO - Reuters",
    "description":"Robinhood Markets Inc, the owner of the trading app which emerged as the go-to destination for retail investors speculating on this year's \"meme' stock trading frenzy, raised $2.1 billion in its initial public offering on Wednesday.",
    "url":"https://www.reuters.com/business/finance/robinhood-gateway-meme-stocks-raises-21-billion-ipo-source-2021-07-28/",
    "urlToImage":"https://www.reuters.com/resizer/ENWTiNGDg0FZbtZz8W3B7a23D-8=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/XE5T7L6KMBII5EDSA57BEIPECU.jpg",
    "publishedAt":"2021-07-29T06:14:00Z",
    "content":"Robinhood logo is seen on a smartphone in front of a displayed same logo in this illustration taken, July 2, 2021. REUTERS/Dado Ruvic/IllustrationJuly 28 (Reuters) - Robinhood Markets Inc, the owner … [+3704 chars]"
    },
    {
    "source":{
    "id":"fox-news",
    "name":"Fox News"
    },
    "author":"Edmund DeMarche",
    "title":"COVID-19 in Los Angeles: Over 25% of cases are fully vaccinated people - Fox News",
    "description":"Health officials in Los Angeles County said over 25% of new coronavirus cases are among those who have been fully vaccinated, an increase from last month, according to a report Wednesday.",
    "url":"https://www.foxnews.com/health/covid-19-in-los-angeles-over-25-of-cases-are-fully-vaccinated-people",
    "urlToImage":"https://static.foxnews.com/foxnews.com/content/uploads/2020/07/Coronavirus-iStock.jpg",
    "publishedAt":"2021-07-29T06:13:19Z",
    "content":"LOS ANGELESHealth officials in Los Angeles County said over 25% of new coronavirus cases are among those who have been fully vaccinated, an increase from last month, according to a report Wednesday.\r… [+1553 chars]"
    },
    {
    "source":{
    "id":null,
    "name":"NPR"
    },
    "author":"",
    "title":"Simone Biles Now Realizes She's More Than Her Gymnastics Accomplishments - NPR",
    "description":"\"the outpouring love & support I've received has made me realize I'm more than my accomplishments and gymnastics which I never truly believed before,\" Biles said in a tweet.",
    "url":"https://www.npr.org/sections/tokyo-olympics-live-updates/2021/07/29/1022066590/simone-biles-tweet-more-than-her-gymnastics-accomplishments-tokyo-olympics",
    "urlToImage":"https://media.npr.org/assets/img/2021/07/29/ap21208454016520_wide-17171edd267b9547148d3b7e5f495bab54fb65ad.jpg?s=1400",
    "publishedAt":"2021-07-29T05:40:01Z",
    "content":"U.S. star Simone Biles has pulled out of the individual all-around final at the Summer Olympics in Tokyo.\r\nGregory Bull/AP\r\nU.S. gymnastics superstar Simone Biles says the wave of support she's recei… [+1452 chars]"
    },
    {
    "source":{
    "id":"google-news",
    "name":"Google News"
    },
    "author":null,
    "title":"Suspect Joseph Jimenez Arrested In Corona Movie Theater Shooting That Left Woman Dead, Man Wounded - CBS Los Angeles",
    "description":null,
    "url":"https://news.google.com/__i/rss/rd/articles/CBMiK2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9RjU1b2ZlMFlCM2vSAQA?oc=5",
    "urlToImage":null,
    "publishedAt":"2021-07-29T05:12:30Z",
    "content":null
    },
    {
    "source":{
    "id":"the-washington-post",
    "name":"The Washington Post"
    },
    "author":"Roman Stubbs, Des Bieler, Cindy Boren, Matt Bonesteel",
    "title":"Olympics 2021 live updates from Day 6 in Tokyo: Katie Ledecky, Caeleb Dressel win swimming medals - The Washington Post",
    "description":"Katie Ledecky, Caeleb Dressel and Bobby Finke highlighted the day’s first swimming session. Later, the women’s gymnastics all-around final, held without Simone Biles, gets underway. Follow here for the latest news and updates from the Tokyo Olympics.",
    "url":"https://www.washingtonpost.com/sports/olympics/2021/07/28/tokyo-olympics-2021-live-updates-highlights-day-6/",
    "urlToImage":"https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/SE2FU7HQEEI6XANSTNYGDJMC3A.jpg&w=1440",
    "publishedAt":"2021-07-29T04:53:05Z",
    "content":"MANILA Two years ago, the office of Philippine President Rodrigo Duterte tagged Filipino weightlifter Hidilyn Diaz as part of a plot to oust him, in what human rights activists saw as a baseless crac… [+1811 chars]"
    },
    {
    "source":{
    "id":null,
    "name":"CBS Sports"
    },
    "author":"",
    "title":"Joey Gallo trade grades: Yankees do well in swapping depth for impact with Rangers - CBS sports.com",
    "description":"New York and Texas reportedly made the biggest trade of MLB deadline week",
    "url":"https://www.cbssports.com/mlb/news/joey-gallo-trade-grades-yankees-do-well-in-swapping-depth-for-impact-with-rangers/",
    "urlToImage":"https://sportshub.cbsistatic.com/i/r/2021/07/29/8c473c17-7798-4368-b695-8893a4156a2e/thumbnail/1200x675/e6fcace677c07ffe137319794c43c645/joey-gallo-rangers.jpg",
    "publishedAt":"2021-07-29T04:49:54Z",
    "content":"The New York Yankees and Texas Rangers reportedly agreed to the biggest trade (in scope and size) of deadline week on Wednesday, swapping six players in a deal headlined by slugger Joey Gallo.\r\nThe l… [+6471 chars]"
    },
    {
    "source":{
    "id":"cnn",
    "name":"CNN"
    },
    "author":"Ben Westcott, CNN Business",
    "title":"Outspoken Chinese billionaire Sun Dawu sentenced to 18 years in prison - CNN",
    "description":"Billionaire Sun Dawu, a vocal critic of the Chinese government, was sentenced to 18 years in prison on Wednesday for \"picking quarrels and provoking troubles,\" according to an official statement posted by the court.",
    "url":"https://www.cnn.com/2021/07/29/business/sun-dawu-prison-sentence-china-intl-hnk/index.html",
    "urlToImage":"https://cdn.cnn.com/cnnnext/dam/assets/210728223703-sun-dawu-2019-file-super-tease.jpg",
    "publishedAt":"2021-07-29T04:48:00Z",
    "content":"Hong Kong (CNN Business)Billionaire Sun Dawu, a vocal critic of the Chinese government, was sentenced to 18 years in prison on Wednesday for \"picking quarrels and provoking troubles,\" according to an… [+2942 chars]"
    },
    {
    "source":{
    "id":"reuters",
    "name":"Reuters"
    },
    "author":"Lucia Mutikani",
    "title":"Fiscal stimulus, vaccines likely fueled U.S. economic growth in the second quarter - Reuters",
    "description":"The U.S. economy likely gained steam in the second quarter, with the pace of growth probably the second fastest in 38 years, as massive government aid and vaccinations against COVID-19 fueled spending on travel-related services.",
    "url":"https://www.reuters.com/world/us/fiscal-stimulus-vaccines-likely-fueled-us-economic-growth-second-quarter-2021-07-29/",
    "urlToImage":"https://www.reuters.com/resizer/Y47rPbpqUq2_4AdkTMhOH_3gwyU=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/HFRF2JNI6JKVDOMPAQS34O37UU.jpg",
    "publishedAt":"2021-07-29T04:03:00Z",
    "content":"Guests enjoy outdoor dining in the Manhattan borough of New York City, U.S., May 23, 2021. REUTERS/Caitlin OchsWASHINGTON, July 29 (Reuters) - The U.S. economy likely gained steam in the second quart… [+6112 chars]"
    },
    {
    "source":{
    "id":"politico",
    "name":"Politico"
    },
    "author":"DEBRA KAHN",
    "title":"Poll: Most California voters want to revamp state's recall process - POLITICO",
    "description":"Sixty percent of likely voters said they would favor changing the state's rules so officials can only be recalled because of illegal or unethical activity.",
    "url":"https://www.politico.com/states/california/story/2021/07/29/poll-most-california-voters-want-to-revamp-california-recall-process-9426970",
    "urlToImage":"https://static.politico.com/fc/36/f2f6dfa14558bb700e21f2a4f57c/ap21207764128410-c.jpg",
    "publishedAt":"2021-07-29T04:02:34Z",
    "content":"The PPIC poll found Gov. Gavin Newsom had an approval rating of 56 percent on jobs and the economy. | Jeff Chiu/AP Photo\r\nSAN FRANCISCO As Gov. Gavin Newsom faces a September recall election, a major… [+2333 chars]"
    },
    {
    "source":{
    "id":"cnn",
    "name":"CNN"
    },
    "author":"Story by Reuters",
    "title":"Tunisia's Saied moves on economy and Covid-19 after dismissing government - CNN",
    "description":"Tunisia's president said on Wednesday he was addressing the country's dire economic and Covid-19 situation, and probing widespread corruption after invoking emergency powers on Sunday to seize control of government in a move his foes called a coup.",
    "url":"https://www.cnn.com/2021/07/28/africa/tunisia-saied-economy-covid-19-intl-hnk/index.html",
    "urlToImage":"https://cdn.cnn.com/cnnnext/dam/assets/210728215059-president-kais-saied-tunisia-0728-super-tease.jpg",
    "publishedAt":"2021-07-29T03:32:00Z",
    "content":"Tunisia's president said on Wednesday he was addressing the country's dire economic and Covid-19 situation, and probing widespread corruption after invoking emergency powers on Sunday to seize contro… [+3805 chars]"
    },
    {
    "source":{
    "id":null,
    "name":"KCRA Sacramento"
    },
    "author":"Kay Recede",
    "title":"Self-proclaimed ex-‘anti-vaxxer’ hospitalized with COVID-19 urges vaccinations - KCRA Sacramento",
    "description":"Philly Baird says he did not believe in the COVID-19 vaccine, until he got infected",
    "url":"https://www.kcra.com/article/self-proclaimed-ex-anti-vaxxer-hospitalized-covid-19-urges-vaccinations/37159106",
    "urlToImage":"https://kubrick.htvapps.com/vidthumb/1f34e7e6-31d0-4354-a941-817d2745217d/1f34e7e6-31d0-4354-a941-817d2745217d_image.jpg?crop=0.780xw:0.780xh;0.0897xw,0.00870xh&resize=1200:*",
    "publishedAt":"2021-07-29T02:53:00Z",
    "content":"MANTECA, Calif. —As the delta variant fuels a rise of COVID-19 cases in San Joaquin County, 25 people are in the ICU due to the virus. One of them is Philly Baird, a Ripon man who KCRA 3 first met in… [+3400 chars]"
    },
    {
    "source":{
    "id":"entertainment-weekly",
    "name":"Entertainment Weekly"
    },
    "author":"Rachel Yang",
    "title":"DaBaby addresses his homophobic comments in new music video: 'Apologies for being me' - Entertainment Weekly News",
    "description":"DaBaby is addressing his homophobic and inaccurate comments while on stage at the Rolling Loud music festival in Miami on Sunday.",
    "url":"https://ew.com/music/dababy-homophobic-comments-new-music-video-apologies-being-me/",
    "urlToImage":"https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=%5B750%2C234%5D&w=1500&h=750&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2021%2F07%2F29%2FDaBaby-Giving-What-Its-Supposed-To-Give.jpg",
    "publishedAt":"2021-07-29T02:48:00Z",
    "content":"After being slammed by fans and fellow artists like Elton John and Dua Lipa, DaBaby is addressing his homophobic and inaccurate comments while on stage at the Rolling Loud music festival in Miami on … [+5545 chars]"
    },
    {
    "source":{
    "id":"google-news",
    "name":"Google News"
    },
    "author":null,
    "title":"More than 94% of recent COVID-19 cases, deaths and hospitalizations in Washington state among those not fully vaccinated, report says - The Seattle Times",
    "description":null,
    "url":"https://news.google.com/__i/rss/rd/articles/CBMitAFodHRwczovL3d3dy5zZWF0dGxldGltZXMuY29tL3NlYXR0bGUtbmV3cy9oZWFsdGgvbW9yZS10aGFuLTk0LW9mLXJlY2VudC1jb3ZpZC0xOS1jYXNlcy1kZWF0aHMtYW5kLWhvc3BpdGFsaXphdGlvbnMtaW4td2FzaGluZ3Rvbi1zdGF0ZS1hbW9uZy10aG9zZS1ub3QtZnVsbHktdmFjY2luYXRlZC1yZXBvcnQtc2F5cy_SAQA?oc=5",
    "urlToImage":null,
    "publishedAt":"2021-07-29T02:17:29Z",
    "content":null
    },
    {
    "source":{
    "id":null,
    "name":"Rolling Stone"
    },
    "author":"Althea Legaspi",
    "title":"Bob Odenkirk ‘Stable’ After ‘Heart-Related Incident’ - Rolling Stone",
    "description":"Actor had collapsed on Tuesday while on the set for Better Call Saul",
    "url":"https://www.rollingstone.com/tv/tv-news/bob-odenkirk-stable-heart-related-incident-1203937/",
    "urlToImage":"https://www.rollingstone.com/wp-content/uploads/2021/07/BobOdenkirk2.jpg",
    "publishedAt":"2021-07-29T02:09:00Z",
    "content":"Bob Odenkirk, the star of AMC’s Better Call Saul, is in stable condition on Wednesday following a heart-related incident, according to reps for the actor. Odenkirk had been filming on set in New Mexi… [+2282 chars]"
    }
    ];
  constructor( private http: HttpClient) { }

  private ejecutaQuery<T>(query: string){
    query = apiUrl + query;

    return this.http.get<T>(query, {headers});
  };

  getTopHeadLines(){

    this.headlinesPage++;
    return this.ejecutaQuery<respuestaTopHeadLines>(`/top-headlines?country=us&page=${this.headlinesPage}`)
   // return this.http.get<respuestaTopHeadLines>('https://newsapi.org/v2/everything?q=tesla&from=2021-06-02&sortBy=publishedAt&apiKey=dfea24ab5dc54e54a9378770dda2ccec');
  }


  getNoticiasHarcodeo(){
    this.headlinesPage++;
    return  this.noticiasHarcodeo
  }


  getTopHeadlinesCategoria( categoria: string) {
   
   if(this.categoriaActual === categoria){
     this.categoriaPage++;
   }
   else{
     this.categoriaPage = 1;
     this.categoriaActual = categoria;
   }
   
    // return this.http.get<respuestaTopHeadLines>('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=dfea24ab5dc54e54a9378770dda2ccec')
    return this.ejecutaQuery<respuestaTopHeadLines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`)
  }


}
