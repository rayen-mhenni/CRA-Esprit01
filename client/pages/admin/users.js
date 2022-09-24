import React from "react";
import Admin from "layouts/Admin.js";
import CardFrais from "components/Cards/CardFrais";
import Cardusers from "components/Cards/Cardusers";

export default function users() {
  return (
          <Cardusers />

  );
}

users.layout = Admin;
