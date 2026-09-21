import mongoose from "mongoose";
import { connectDatabase, disconnectDatabase } from "./config/db.js";
import { OrganizationModel } from "./models/organization.model.js";
import * as projectService from "./services/projectService.js"; // importem totes les funcions del service juntes

async function main() {
  await connectDatabase();

  // Necessitem una organització per poder crear el projecte; si no n'hi ha cap, en creem una de prova
  let org = await OrganizationModel.findOne();
  if (!org) {
    org = await OrganizationModel.create({ name: "Organización de prueba" });
  }
  console.log("Organización usada:", org.id);

  // Provem create()
  const proj = await projectService.create({
    name: "Proyecto de prueba",
    description: "Creado desde main.ts para probar el CRUD",
    organization: org._id as mongoose.Types.ObjectId,
  });
  console.log("Creado:", proj);

  // Provem getById() -> aquí és on hauríem de veure el populate funcionant (l'organització sencera, no l'ID)
  const found = await projectService.getById(proj.id);
  console.log("Con populate de la organización:", found);

  // Provem update()
  const updated = await projectService.update(proj.id, {
    description: "Descripción actualizada",
  });
  console.log("Actualizado:", updated);

  // Provem listAll()
  const all = await projectService.listAll();
  console.log("Todos los proyectos:", all);

  // Provem deleteProject() al final, per deixar la BBDD neta de dades de prova
  const deleted = await projectService.deleteProject(proj.id);
  console.log("Eliminado:", deleted);

  await disconnectDatabase();
}

// Si peta qualsevol cosa dins de main(), ho capturem aquí en lloc de deixar-ho petar en silenci
main().catch((err) => {
  console.error("Error en main.ts:", err);
  process.exit(1);
});