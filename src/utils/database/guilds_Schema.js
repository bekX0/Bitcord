const mongoose = require("mongoose");

const guilds_Schema = mongoose.model("guilds", new mongoose.Schema({
    guildId: {type: String, required:true, unique: true},
    guildName: {type: String, required:true, unique: false},
    guildLevel: {type: Number, default: 0, required:true, unique: false},
    ownerId: {type: String, required:true},
    settingsChannel: {type: String, required:false},
    regRequestChannel: {type: String},
    regLogChannel: {type: String},
    autoRoleStatus: {type: Boolean, default: false},
    autoRoleList: {type: Array},
    registerSystemStatus: {type: Boolean, default: false},
    registererRoles: {type: Array},
    unregisteredRole: {type: String},
    registeredRoles: {type: Object, default: {reg: undefined, male: undefined, female: undefined}},
    registerRequested: {type: Array},
    autoMessageStatus: {type: Boolean, default: false},
    autoMessageList: {type: Array},
    messageFilterStatus: {type: Boolean, default: false},
    reactionRoles:{type: Array}
}))

module.exports = {guilds_Schema}