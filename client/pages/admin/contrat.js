import React from "react";
import Admin from "layouts/Admin.js";
import CardFrais from "components/Cards/CardFrais";
import CardContrat from "components/Cards/CardContrat";

export default function contrat() {
  return (
          <CardContrat />

  );
}

contrat.layout = Admin;
