exports.getDistricts = async (req, res, next) => {
  let city = req.params.city;

  console.log("hereeee");

  let Regions = {
    Daressalaam: ["Ilala", "Ubungo", "Temeke", "Kinondoni", "Kigamboni"],
    Arusha: ["Arusha mjini", "Babati", "ngorongoro"],
  };

  try {
    if (city == "Dar-es-salaam") {
      res.status(200).json(Regions[Daressalaam]);
    } else if (city == "Arusha") {
      res.status(200).json(Regions[Arusha]);
    } else {
      res.status(500);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getWards = async (req, res, next) => {
  try {
    let Wards = {
      Ilala: ["kiki", "weko", "wek"],
      Ubungo: ["hey", "heyei", "heeey"],
      Temeke: ["pei", "wew", "teu"],
      Kinondoni: ["dei", "ret", "rert"],
      Kigamboni: ["mbon", "hpni", "poni"],
    };
  } catch (error) {
    console.log(error);
  }
};
