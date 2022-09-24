const express = require("express");
const User = require("../models/users.models");
const Useral1 = require("../models/users.models.al1");
const bcrypt = require("bcrypt");
const key = require("../config/keys");
const jwt = require("jsonwebtoken");
const router = express.Router();
const passport = require("passport");
const validateLogin = require("../validator/Login");
const validateRegister = require("../validator/Register");
const Cra = require("../models/CraModel");
const Contart = require("../models/Contract.Model");
const NoteFrais = require("../models/NoteFrais.Model");
const Contracts = require("../models/Contracts.Model");

router.get("/test", (req, res) => res.json("work pages users"));

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegister(req.body);
  if (!isValid) {
    return res.status(404).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "email already exists";
      return res.status(404).json(errors);
    } else {
      const newuser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newuser.password, salt, function (err, hash) {
          if (err) {
            throw err;
          }
          newuser.password = hash;
          newuser
            .save()
            .then((user) => res.json(user))
            .catch((err) => res.send(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    return res.status(404).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      errors.email = "user not found";
      return res.status(404).json(errors);
    }
    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
        };
            jwt.sign(
              payload,
              key.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token,
                  email: req.body.email,
                  isAdmin: user.isAdmin,
                });
              }
            )
      } else {
        errors.password = "incorrect password";
        res.status(404).json(errors);
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

//*******************************************************************************CRA  APIS ************************************************************************
router.post("/cra", (req, res) => {
  const { email, type, content, mounth, day } = req.body;

  const cra = Cra.create({
    email,
    type,
    content,
    mounth,
    day,
  });

  if (cra) {
    res.status(200).json({
      message: "Creted with success",
    });
  } else {
    res.status(400);
    throw new Error("Invalid Cra Data");
  }
});

router.post("/get/cra", (req, res) => {
  const { email, mounth } = req.body;
  Cra.find({ email, mounth }).then((cra) => {
    if (cra) {
      res.status(200).json({
        DataList: cra,
      });
    } else {
      res.status(400);
      throw new Error("Not found Cra Data");
    }
  });
});

router.post("/delete/cra", (req, res) => {
  const { email, day, mounth } = req.body;

  Cra.findOneAndDelete({ email, day, mounth }).then((cra) => {
    if (cra) {
      res.status(200).json({
        message: "Deleted",
      });
    } else {
      res.status(400);
      throw new Error("Not found Cra Data");
    }
  });
});

router.put("/cra/:id", (req, res) => {
  const { id } = req.params;
  const { email, type, content, mounth, day } = req.body;
  Cra.findByIdAndUpdate(id, { email, type, content, mounth, day }).then(
    (cra) => {
      if (cra) {
        res.status(200).json({
          message: "Updated",
        });
      } else {
        res.status(400);
        throw new Error("Not found Cra Data");
      }
    }
  );
});

//************************************ Contrat ************************************************************* */
router.post("/contrat", (req, res) => {
  const {
    user,
    type,
    salaryBf,
    salaryAf,
    TotaleConges,
    TotaleN,
    TotaleCongesRest,
    Prime,
    Res,
    chomage,
    fraisges,
    prov,
    charge_soc,
    salairebruit,
    netavant,
    rest_mois,
    rest_Total,
    Status
  } = req.body;

  const contart = Contart.create({
    user,
    type,
    salaryBf,
    salaryAf,
    TotaleConges,
    TotaleN,
    TotaleCongesRest,
    Prime,
    Res,
    chomage,
    fraisges,
    prov,
    charge_soc,
    salairebruit,
    netavant,
    rest_mois,
    rest_Total,
    Status
  });

  if (contart) {
    res.status(200).json({
      message: "Creted with success",
    });
  } else {
    res.status(400);
    throw new Error("Invalid contart Data");
  }
});
router.put("/contrat/:id", (req, res) => {
  const { id } = req.params;

  const {
    user,
    type,
    salaryBf,
    salaryAf,
    TotaleConges,
    TotaleN,
    TotaleCongesRest,
    Prime,
    Res,
    chomage,
    fraisges,
    prov,
    charge_soc,
    salairebruit,
    netavant,
    rest_mois,
    rest_Total,
    Status
  } = req.body;
  Contart.findByIdAndUpdate(id, {
    user,
    type,
    salaryBf,
    salaryAf,
    TotaleConges,
    TotaleN,
    TotaleCongesRest,
    Prime,
    Res,
    chomage,
    fraisges,
    prov,
    charge_soc,
    salairebruit,
    netavant,
    rest_mois,
    rest_Total,
    Status
  }).then((cra) => {
    if (cra) {
      res.status(200).json({
        message: "Updated",
      });
    } else {
      res.status(400);
      throw new Error("Not found Cra Data");
    }
  });

});

router.get("/contrat/:id", (req, res) => {
  const { id } = req.params;
  Contart.findOne({ user: id })
    .then((con) => {
      if (con) {
        res.status(200).json({
          con,
        });
      } else {
        res.status(400);
        throw new Error("Not found contart Data");
      }
    })
    .catch(() => {
      res.status(400);
    });
});

//*************************************************  Note De Frais ************************************************************************/

router.post("/frais", (req, res) => {
  const {
    user,
    type,
    date,
    ClientFrais,
    justification,
    motif,
    HT,
    TTC,
    TVA,
    MontantRemb,
    TVADed,
    Immobilisation,
    Status,
  } = req.body;

  const Frais = NoteFrais.create({
    user,
    type,
    date,
    ClientFrais,
    justification,
    motif,
    HT,
    TTC,
    TVA,
    MontantRemb,
    TVADed,
    Immobilisation,
    Status,
  });

  if (Frais) {
    res.status(200).json({
      message: "Creted with success",
    });
  } else {
    res.status(400);
    throw new Error("Invalid Cra Data");
  }
});

router.put("/frais/:id", (req, res) => {
  const { id } = req.params;
  const {
    type,
    date,
    ClientFrais,
    justification,
    motif,
    HT,
    TTC,
    TVA,
    MontantRemb,
    TVADed,
    Immobilisation,
    Status,
  } = req.body;

  NoteFrais.findByIdAndUpdate(id, {
    type,
    date,
    ClientFrais,
    justification,
    motif,
    HT,
    TTC,
    TVA,
    MontantRemb,
    TVADed,
    Immobilisation,
    Status,
  }).then((cra) => {
    if (cra) {
      res.status(200).json({
        message: "Updated",
      });
    } else {
      res.status(400);
      throw new Error("Not found Cra Data");
    }
  });
});

router.get("/frais/:id", (req, res) => {
  const { id } = req.params;
  NoteFrais.findById(id)
    .then((con) => {
      if (con) {
        res.status(200).json({
          con,
        });
      } else {
        res.status(400);
        throw new Error("Not found contart Data");
      }
    })
    .catch(() => {
      res.status(400);
    });
});

router.delete("/frais/:id", (req, res) => {
  const { id } = req.params;

  NoteFrais.findByIdAndDelete(id).then((cra) => {
    if (cra) {
      res.status(200).json({
        message: "Deleted",
      });
    } else {
      res.status(400);
      throw new Error("Not Data");
    }
  });
});

router.get("/frais/:userid/:type", (req, res) => {
  const { userid, type } = req.params;
  if (type == "ALL") {
    NoteFrais.find({ user: userid })
      .then((con) => {
        if (con) {
          res.status(200).json({
            con,
          });
        } else {
          res.status(400);
          throw new Error("Not found contart Data");
        }
      })
      .catch(() => {
        res.status(400);
      });
  } else
    NoteFrais.find({ user: userid, type: type })
      .then((con) => {
        if (con) {
          res.status(200).json({
            con,
          });
        } else {
          res.status(400);
          throw new Error("Not found contart Data");
        }
      })
      .catch(() => {
        res.status(400);
      });
});

//***************************** Upload Image  **************************************************/

//***************************** Contract APIS **************************************************************** */

router.post("/Contracts", (req, res) => {
  const {
    user,
    type,
    Client,
    dateDebut,
    dateFin,
    Description,
    LieuServ,
    NumRue,
    NomRue,
    code,
    Ville,
    Pays,
    Fact_delaiDePayement,
    Fact_ModeDenvoi,
    Fact_conditions,
    Fact_procedure,
    Fact_justification,
  } = req.body;

  const contracts = Contracts.create({
    user,
    type,
    Client,
    dateDebut,
    dateFin,
    Description,
    LieuServ,
    NumRue,
    NomRue,
    code,
    Ville,
    Pays,
    Fact_delaiDePayement,
    Fact_ModeDenvoi,
    Fact_conditions,
    Fact_procedure,
    Fact_justification,
  });

  if (contracts) {
    res.status(200).json({
      message: "Creted with success",
    });
  } else {
    res.status(400);
    throw new Error("Invalid Cra Data");
  }
});

router.put("/Contracts/:id", (req, res) => {
  const { id } = req.params;
  const {
    user,
    type,
    Client,
    dateDebut,
    dateFin,
    Description,
    LieuServ,
    NumRue,
    NomRue,
    code,
    Ville,
    Pays,
    Fact_delaiDePayement,
    Fact_ModeDenvoi,
    Fact_conditions,
    Fact_procedure,
    Status,
    Fact_justification,
  } = req.body;

  Contracts.findByIdAndUpdate(id, {
    user,
    type,
    Client,
    dateDebut,
    dateFin,
    Description,
    LieuServ,
    NumRue,
    NomRue,
    code,
    Status,
    Ville,
    Pays,
    Fact_delaiDePayement,
    Fact_ModeDenvoi,
    Fact_conditions,
    Fact_procedure,
    Fact_justification,
  }).then((cra) => {
    if (cra) {
      res.status(200).json({
        message: "Updated",
      });
    } else {
      res.status(400);
      throw new Error("Not found Cra Data");
    }
  });
});

router.get("/Contracts/:id", (req, res) => {
  const { id } = req.params;
  Contracts.findById(id)
    .then((con) => {
      if (con) {
        res.status(200).json({
          con,
        });
      } else {
        res.status(400);
        throw new Error("Not found contart Data");
      }
    })
    .catch(() => {
      res.status(400);
    });
});

router.delete("/Contracts/:id", (req, res) => {
  const { id } = req.params;

  Contracts.findByIdAndDelete(id).then((cra) => {
    if (cra) {
      res.status(200).json({
        message: "Deleted",
      });
    } else {
      res.status(400);
      throw new Error("Not Data");
    }
  });
});

router.get("/Contracts/List/:userid", (req, res) => {
  const { userid } = req.params;
  Contracts.find({ user: userid })
    .then((con) => {
      if (con) {
        res.status(200).json({
          con,
        });
      } else {
        res.status(400);
        throw new Error("Not found contart Data");
      }
    })
    .catch(() => {
      res.status(400);
    });
});
/******************************************************************Others*************************************** */
router.get("/Users/List", (req, res) => {
  User.find()
    .then((user) => {
      if (user) {
        res.status(200).json({
          user,
        });
      } else {
        res.status(400);
        throw new Error("No user!");
      }
    })
    .catch(() => {
      res.status(400);
    });
});
router.put("/Users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  User.findByIdAndUpdate(id, {
    name,
    email,
  }).then((user) => {
    if (user) {
      res.status(200).json({
        message: "Updated",
      });
    } else {
      res.status(400);
      throw new Error("User Not found");
    }
  });
});
router.delete("/Users/:id", (req, res) => {
  const { id } = req.params;

  User.findByIdAndDelete(id).then((user) => {
    if (user) {
      res.status(200).json({
        message: "Deleted",
      });
    } else {
      res.status(400);
      throw new Error("Not Data");
    }
  });
});

module.exports = router;
