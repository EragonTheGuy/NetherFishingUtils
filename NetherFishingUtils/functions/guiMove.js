import { data } from "../guiCoords"
import Settings, {Sounds} from "../configOne/config";


register("dragged", (mx, my, x, y) => {
    if (Settings.bobberTextMove.isOpen()) {
        data.bobberCount.x = x;
        data.bobberCount.y = y;
        data.save();
    } else if(Settings.catchesTextMove.isOpen()) {
        data.catches.x = x;
        data.catches.y = y;
        data.save();
    } else if(Settings.catchesPerMinTextMove.isOpen()) {
        data.catchesPerMin.x = x;
        data.catchesPerMin.y = y;
        data.save();
    } else if(Settings.timerTextMove.isOpen()) {
        data.fishingTimer.x = x;
        data.fishingTimer.y = y;
        data.save();
    } else if(Settings.scsTextMove.isOpen()) {
        data.scsText.x = x;
        data.scsText.y = y;
        data.save();
    } else if(Settings.ScsPerMinTextMove.isOpen()) {
        data.scsPerMinText.x = x;
        data.scsPerMinText.y = y;
        data.save();
    } else if(Settings.gainedMembranesMove.isOpen()) {
        data.gainedMembranes.x = x;
        data.gainedMembranes.y = y;
        data.save();
    } else if(Settings.membranesKillingMove.isOpen()) {
        data.membraneDifference.x = x;
        data.membraneDifference.y = y;
        data.save();
    } else if(Settings.totemTimerMove.isOpen()) {
        data.totemTimer.x = x;
        data.totemTimer.y = y;
        data.save();
    } 
})