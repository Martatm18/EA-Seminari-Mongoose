import { Schema, model, Types, Document } from "mongoose";

// Interfície de TS per tipar el document. Extends Document perquè així tenim
// també els camps propis de Mongoose (com _id) sense haver-los de posar a mà
export interface IProject extends Document {
  name: string;
  description?: string; // opcional, per això el '?'
  organization: Types.ObjectId; // aquí guardem només l'ID de l'organització, no tot l'objecte
  createdAt: Date;
}

// Schema tipat amb la interfície de dalt, per tenir autocompletat i que TS ens avisi si ens equivoquem
const projectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  description: { type: String },
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization", // amb això li diem a Mongoose que aquest ID és d'un document d'Organization
    required: true,
  },
  createdAt: { type: Date, default: Date.now }, // si no li passem data, posa la d'ara mateix
});

// Model que farem servir des del service per fer el CRUD
export const Project = model<IProject>("Project", projectSchema);