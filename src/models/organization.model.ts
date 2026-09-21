import { Schema, model, Types } from "mongoose";

export interface IOrganization {
	_id: Types.ObjectId;
	name: string;
	country: string;
}

const organizationSchema = new Schema<IOrganization>({
	name: { type: String, required: true, trim: true },
	country: { type: String, required: true, trim: true },
});

export const OrganizationModel = model<IOrganization>(
	"Organization",
	organizationSchema
);
