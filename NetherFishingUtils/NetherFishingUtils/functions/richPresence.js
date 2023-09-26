import RichPresence from "../../RichPresence"

ChatLib.chat("rpc loaded")
const rpc = new RichPresence("1154797792468930580", {
    state: "feeshing",
    details: "Playing ChatTriggers",
    startTimestamp: Date.now(),
    largeImageKey: "imageName", //this image is uploaded to the rich presence section of your application https://discord.com/developers/applications
    largeImageText: "I appear when you hover over me!",
    readyListener: console.log,
    packetListener: console.log,
    errorListener: (code, message) => ChatLib.chat("code: " + code + "    message: "  + message)
  })