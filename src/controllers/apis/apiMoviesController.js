let db = require("../../database/models");


const getUrl = (req) =>
  req.protocol + "://" + req.get("host") + req.originalUrl;


module.exports = {
  getAll: (req, res) => {
  
  db.Movie.findAll({
      include: [
        {
          association: "genre",
        },
        {
          association: "actors",
        },
      ],
    })
      .then((movies) => {
        return res.json({
          meta: {
            endpoint: getUrl(req),
            status: 200,
            total: movies.length,
          },
          data: movies,
        });
      })
      .catch((error) => res.status(400).send(error));  },
  getOne: (req, res) => {
    if (req.params.id % 1 !== 0 || req.params.id < 0) {
      return res.status(404).json({
        meta: {
          status: 400,
          msg: "ID wrong",
        },
      });
    } else {
      db.Movie.findOne(
        {
          where: {
            id: req.params.id,
          },
        },
        {
          include: [
            {
              association: "movies",
            },
            {
              association: "genre",
            },
          ],
        }
      )
        .then((movie) => {
          if (movie) {
            return res.status(200).json({
              meta: {
                endpoint: getUrl(req),
                status: 200,
              },
              data: movie,
            });
          } else {
            return res.status(404).json({
              meta: {
                status: 400,
                msg: "ID not found",
              },
            });
          }
        })
        .catch((error) => res.status(400).send(error));
    }
  },
  create: (req, res) => {
    const { title, rating, awards, release_date, length, genre_id } = req.body;
    db.Movie.create({
      title,
      rating,
      awards,
      release_date,
      length,
      genre_id,
    })
      .then((movie) => {
        res.status(201).json({
          //201 = Created
          meta: {
            endpoint: getUrl(req),
            msg: "Movie added successfully",
          },
          data: movie,
        });
      })
      .catch((error) => {
        switch (error.name) {
          case "SequelizeValidationError":
            let errorsMsg = [];
            let notNullErrors = [];
            let validationsErrors = [];
            error.errors.forEach((error) => {
              errorsMsg.push(error.message);
              if (error.type == "notNull Violation") {
                notNullErrors.push(error.message);
              }
              if (error.type == "Validation error") {
                validationsErrors.push(error.message);
              }
            });
            let response = {
              status: 400, // 400 = Bad request
              messages: "missing or wrong data",
              errors: {
                quantity: errorsMsg.length,
                msg: errorsMsg,
                notNull: notNullErrors,
                validations: validationsErrors,
              },
            };
            return res.status(400).json(response);
          default:
            return res.status(500).json({
              error,
            });
        }
      });
  },
  update: (req, res) => {
    const { title, rating, awards, release_date, length, genre_id } = req.body;

    db.Movie.update(
      {
        title,
        rating,
        awards,
        release_date,
        length,
        genre_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((result) => {
        if (result) {
          return res.status(201).json({
            msg: "updated successfully",
          });
        } else {
          return res.status(200).json({
            msg: "no changes",
          });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  delete: (req, res) => {
    let actorUpdate = db.Actor.update(
      {
        favorite_movie_id: null,
      },
      {
        where: {
          favorite_movie_id: req.params.id,
        },
      }
    );
    let actorMovieUpdate = db.actor_movie.destroy({
      where: {
        movie_id: req.params.id,
      },
    });
    Promise.all([actorUpdate, actorMovieUpdate]).then(
      db.Movie.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then(result => {
          if (result) {
            return res.status(200).json({
              msg: "movie deleted successfully",
            });
          } else {
            return res.status(200).json({
              msg: "no changes",
            });
          }
        })
        .catch((err) => res.status(500).json(err))
    );
  },
};
