// Amb .js al final perquè el tsconfig fa servir moduleResolution node16 i si no, peta l'import
import { IProject, Project } from "../models/project.model.js";

// Guarda un projecte nou. Partial<IProject> = no cal passar tots els camps, només els que tinguem
export const create = async (data: Partial<IProject>): Promise<IProject> => {
  return Project.create(data);
};

// Busca pel id i fa el populate de l'organització, així no ens surt només l'ID sinó tot l'objecte
export const getById = async (id: string): Promise<IProject | null> => {
  return Project.findById(id).populate("organization").exec();
};

// { new: true } és important: si no ho poses, et retorna el document ABANS d'actualitzar-lo
export const update = async (
  id: string,
  data: Partial<IProject>
): Promise<IProject | null> => {
  return Project.findByIdAndUpdate(id, data, { new: true }).exec();
};

export const listAll = async (): Promise<IProject[]> => {
  return Project.find().populate("organization").lean();
};

// Es diu deleteProject i no delete perquè "delete" és paraula reservada en JS/TS, no es pot fer servir
export const deleteProject = async (id: string): Promise<IProject | null> => {
  return Project.findByIdAndDelete(id).exec();
};