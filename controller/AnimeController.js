var scraperjs = require("scraperjs");

class AnimeController {
  anime(req, res) {
    const { id } = req.params;
    const page = `https://samehadaku.vip/anime/${id}/`;
    scraperjs.StaticScraper.create(page).scrape(function ($) {
      var data = {};
      //   Title
      data.title = $(".infox h1")
        .map(function () {
          return $(this).text();
        })
        .get()[0];
      // Sinopsis
      data.sinopsis = $(".entry-content.entry-content-single p")
        .map(function () {
          return $(this).text();
        })
        .get()[0];
      // Image
      data.image = $(".thumb img")
        .map(function () {
          return $(this).attr("src");
        })
        .get()[0];
      // Genres
      data.genre = $(".genre-info a")
        .map(function () {
          return {
            text: $(this).text(),
            link: $(this).attr("href"),
          };
        })
        .get();
      // Rating Value
      data.ratingValue = $("[itemprop=ratingValue]")
        .map(function () {
          return $(this).text();
        })
        .get()[0];
      // Rating Count
      data.ratingCount = $("[itemprop=ratingCount]")
        .map(function () {
          return $(this).text();
        })
        .get()[0];
      // Detail
      data.detail = {};
      data.detail.japanese = $(".spe span:nth-of-type(1)")
        .map(function () {
          return $(this).text();
        })
        .get()[0];
      data.detail.english = $(".spe span:nth-of-type(3)")
        .map(function () {
          return $(this).text();
        })
        .get()[0];
      data.detail.type = $(".spe span:nth-of-type(5)")
        .map(function () {
          return $(this).text();
        })
        .get()[0];
      data.detail.duration = $(".spe span:nth-of-type(7)")
        .map(function () {
          return $(this).text();
        })
        .get()[0];
      data.detail.season = $(".spe span:nth-of-type(9)")
        .map(function () {
          return $(this).text();
        })
        .get()[0];
      data.detail.producers = $(".spe span:nth-of-type(11)")
        .map(function () {
          return $(this).text();
        })
        .get()[0];
      data.detail.synonims = $(".spe span:nth-of-type(2)")
        .map(function () {
          return $(this).text();
        })
        .get()[0];
      data.detail.status = $(".spe span:nth-of-type(4)")
        .map(function () {
          return $(this).text();
        })
        .get()[0];
      data.detail.source = $(".spe span:nth-of-type(6)")
        .map(function () {
          return $(this).text();
        })
        .get()[0];
      data.detail.totalEpisode = $(".spe span:nth-of-type(8)")
        .map(function () {
          return $(this).text();
        })
        .get()[0];
      data.detail.studio = $(".spe span:nth-of-type(10)")
        .map(function () {
          return $(this).text();
        })
        .get()[0];
      data.detail.release = $(".spe span:nth-of-type(12)")
        .map(function () {
          return $(this).text();
        })
        .get()[0];
      // Youtube Trailer
      data.youtube = $("iframe")
        .map(function () {
          return {
            link: $(this).attr("src"),
            id: $(this)
              .attr("src")
              .replace("https://www.youtube.com/embed/", "")
              .trim(),
          };
        })
        .get()[0];
      data.list_episode = $(".lstepsiode.listeps ul li")
        .map(function () {
          return {
            episode: $(this).find(".epsright .eps a").text(),
            title: $(this).find(".epsleft .lchx a").text(),
            date_uploaded: $(this).find(".epsleft .date").text(),
            link: $(this).find(".epsright .eps a").attr("href"),
            id: $(this)
              .find(".epsright .eps a")
              .attr("href")
              .replace("https://samehadaku.vip/", ""),
          };
        })
        .get();

      res.send(data);
    });
  }

  readanime(req, res) {
    const { link } = req.params;
    const page = `https://samehadaku.vip/${link}/`;

    scraperjs.StaticScraper.create(page).scrape(function ($) {
      var data = {};
      data.title = $("h1.entry-title")
        .map(function () {
          return $(this).text();
        })
        .get()[0];
      data.eps = $("span[itemprop=episodeNumber]")
        .map(function () {
          return $(this).text();
        })
        .get()[0];
      data.uploader = $("span.year")
        .map(function () {
          return $(this).text().replace("Diposting oleh ", "").split(" - ")[0];
        })
        .get()[0];
      data.date_uploaded = $("span.year")
        .map(function () {
          return $(this).text().replace("Diposting oleh ", "").split(" - ")[1];
        })
        .get()[0];
      data.detail_anime = {
        title: $(".infoanime .infox h2.entry-title")
          .map(function () {
            return $(this).text();
          })
          .get()[0],
        image: $(".infoanime .thumb img")
          .map(function () {
            return $(this).attr("src");
          })
          .get()[0],
        sinopsis: $(".infoanime .infox .desc div")
          .map(function () {
            return $(this).text();
          })
          .get()[0],
        genres: $(".infoanime .infox .genre-info a")
          .map(function () {
            return $(this).text();
          })
          .get(),
      };
      data.downloadEps = $(".download-eps")
        .map(function () {
          return {
            format: $(this).find("p").text(),
            data: $(this)
              .find("ul li")
              .map(function () {
                return {
                  quality: $(this).find("strong").text(),
                  link: {
                    zippyshare: $(this)
                      .find("span:nth-of-type(1) a")
                      .attr("href"),
                    gdrive: $(this).find("span:nth-of-type(2) a").attr("href"),
                    reupload: $(this)
                      .find("span:nth-of-type(3) a")
                      .attr("href"),
                  },
                };
              })
              .get(),
          };
        })
        .get();

      res.send(data);
    });
  }

  search(req, res) {
    const { title } = req.params;
    const page = `https://samehadaku.vip/?s=${title}`;

    scraperjs.StaticScraper.create(page).scrape(function ($) {
      let data = {};
      data.results = $(".site-main .animpost")
        .map(function () {
          return {
            title: $(this).find(".animepost .stooltip .title h4").text(),
            score: $(this).find(".animepost .stooltip .skor").text().trim(),
            view: $(this)
              .find(".animepost .stooltip .metadata span:last-of-type")
              .text()
              .replace(" Dilihat", ""),
            image: $(this).find(".animepost .animposx img").attr("src"),
            sinopsis: $(this).find(".animepost .stooltip .ttls").text().trim(),
            genres: $(this)
              .find(".animepost .stooltip .genres .mta a")
              .map(function () {
                return $(this).text();
              })
              .get(),
            status: $(this)
              .find(".animepost .animposx a .data .type")
              .text()
              .trim(),
            link: $(this).find(".animepost .animposx a").attr("href"),
            linkId: $(this)
              .find(".animepost .animposx a")
              .attr("href")
              .replace("https://samehadaku.vip/anime/", "")
              .replace("/", ""),
          };
        })
        .get();

      res.send(data);
    });
  }

  searchByPage(req, res) {
    const { title, page } = req.params;
    const pager = `https://samehadaku.vip/page/${page}/?s=${title}`;

    scraperjs.StaticScraper.create(pager).scrape(function ($) {
      let data = {};
      data.results = $(".site-main .animpost")
        .map(function () {
          return {
            title: $(this).find(".animepost .stooltip .title h4").text(),
            score: $(this).find(".animepost .stooltip .skor").text().trim(),
            view: $(this)
              .find(".animepost .stooltip .metadata span:last-of-type")
              .text()
              .replace(" Dilihat", ""),
            image: $(this).find(".animepost .animposx img").attr("src"),
            sinopsis: $(this).find(".animepost .stooltip .ttls").text().trim(),
            genres: $(this)
              .find(".animepost .stooltip .genres .mta a")
              .map(function () {
                return $(this).text();
              })
              .get(),
            status: $(this)
              .find(".animepost .animposx a .data .type")
              .text()
              .trim(),
            link: $(this).find(".animepost .animposx a").attr("href"),
            linkId: $(this)
              .find(".animepost .animposx a")
              .attr("href")
              .replace("https://samehadaku.vip/anime/", "")
              .replace("/", ""),
          };
        })
        .get();

      res.send(data);
    });
  }

  season(req, res) {
    const page = `https://samehadaku.vip/season/spring-2020/`;

    scraperjs.StaticScraper.create(page)
      .scrape(function ($) {
        var data = {};

        data.title = $(".widget-title h1.page-title")
          .map(function () {
            return $(this).text();
          })
          .get()[0];

        data.results = $(".relat .animpost")
          .map(function () {
            return {
              title: $(this).find(".animepost .stooltip .title h4").text(),
              score: $(this).find(".animepost .stooltip .skor").text().trim(),
              view: $(this)
                .find(".animepost .stooltip .metadata span:last-of-type")
                .text()
                .replace(" Dilihat", ""),
              image: $(this).find(".animepost .animposx img").attr("src"),
              sinopsis: $(this)
                .find(".animepost .stooltip .ttls")
                .text()
                .trim(),
              genres: $(this)
                .find(".animepost .stooltip .genres .mta a")
                .map(function () {
                  return $(this).text();
                })
                .get(),
              status: $(this)
                .find(".animepost .animposx a .data .type")
                .text()
                .trim(),
              link: $(this).find(".animepost .animposx a").attr("href"),
              linkId: $(this)
                .find(".animepost .animposx a")
                .attr("href")
                .replace("https://samehadaku.vip/anime/", "")
                .replace("/", ""),
            };
          })
          .get();

        return data;
      })
      .then(function (data) {
        const page = `https://samehadaku.vip/season/spring-2020/page/2/`;

        scraperjs.StaticScraper.create(page).scrape(function ($) {
          var results = $(".relat .animpost")
            .map(function () {
              return {
                title: $(this).find(".animepost .stooltip .title h4").text(),
                score: $(this).find(".animepost .stooltip .skor").text().trim(),
                view: $(this)
                  .find(".animepost .stooltip .metadata span:last-of-type")
                  .text()
                  .replace(" Dilihat", ""),
                image: $(this).find(".animepost .animposx img").attr("src"),
                sinopsis: $(this)
                  .find(".animepost .stooltip .ttls")
                  .text()
                  .trim(),
                genres: $(this)
                  .find(".animepost .stooltip .genres .mta a")
                  .map(function () {
                    return $(this).text();
                  })
                  .get(),
                status: $(this)
                  .find(".animepost .animposx a .data .type")
                  .text()
                  .trim(),
                link: $(this).find(".animepost .animposx a").attr("href"),
                linkId: $(this)
                  .find(".animepost .animposx a")
                  .attr("href")
                  .replace("https://samehadaku.vip/anime/", "")
                  .replace("/", ""),
              };
            })
            .get();

          data.results = [...data.results, ...results];

          res.send(data);
        });
      });
  }

  date(req, res) {
    const page = `https://samehadaku.vip/jadwal-rilis/`;

    scraperjs.StaticScraper.create(page).scrape(function ($) {
      var data = {};

      data.title = "Jadwal Rilis";

      var length = $(".schedule .tab-dates")
        .map(function () {
          return $(this).text();
        })
        .get().length;
      
        var day = $(".schedule .tab-dates")
          .map(function () {
            return $(this).text().trim();
          })
          .get();
        data.results = $('.schedule .result-schedule').map(function(index , element){
          return {
            day: day[index],
            list: $(this).find('.animepost').map(function(){
              return {
                title: $(this).find(".animposx a .data .title").text().trim(),
                image: $(this).find(".animposx a .content-thumb img").attr('src'),
                score: $(this).find(".animposx a .content-thumb .score").text().trim(),
                genres: $(this).find(".animposx a .data .type").text().trim().split(', '),
                link: $(this).find(".animposx a").attr('href'),
                linkId: $(this).find(".animposx a").attr('href').replace('https://samehadaku.vip/anime/' , '').replace('/' , '')
              };
            }).get()
          };
        }).get();

      res.send(data);
    });
  }
}

module.exports = new AnimeController();
