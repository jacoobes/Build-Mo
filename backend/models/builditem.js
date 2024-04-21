import mongoose from 'mongoose';
/* an example
*/
/*
    case-accessory.json" "case-fan.json" "case.json" "cpu-cooler.json" "cpu.json" "external-hard-drive.json" "fan-controller.json" "headphones.json" "
internal-hard-drive.json" "keyboard.json" "memory.json" "monitor.json" "motherboard.json" "mouse.json" "optical-drive.json" "os.json" "power-supply.
json" "sound-card.json" "speakers.json" "thermal-paste.json" "ups.json" "video-card.json" "webcam.json" "wired-network-card.json" "wireless-network-
card.json    
*/
const builditem = new mongoose.Schema({
    category: {
        type: String,
        enum : ["case-accessory", "case-fan",
                "case", "cpu-cooler",
                "cpu", "external-hard-drive",
                "fan-controller", "headphones", "internal-hard-drive",
                "keyboard", "memory", "monitor", "motherboard", "mouse",
                "optical-drive", "os","power-supply", "sound-card", "speakers",
                "thermal-paste", "ups", "video-card", "webcam", "wired-network-card",
                "wireless-network-card"],
        required: true
    },
    name: {
        required: true,
        type: String
    },
    price: {
        type: Number
    },
    extra: {
        type: String
    }
});
const Comment = mongoose.model('BuildItem', builditem);

export default Comment;
