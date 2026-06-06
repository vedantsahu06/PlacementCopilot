import mongoose from "mongoose";

const roleInsightSchema = new mongoose.Schema({
    role:{
        type: String,
        required: true
    },
    insights:{
        type: Object,
        required: true
    }
},{
    timestamps: true
})

export const RoleInsight = mongoose.model('RoleInsight', roleInsightSchema);