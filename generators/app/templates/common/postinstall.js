import figlet from "figlet";
import printMessage from "print-message";

const postInstallMsg = () => {
    figlet("Bornfight \nTools", (err, data) => {
        if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
        }
        console.log(data);
        printMessage([
            "Type \"npm run dev\" to start working",
            "",
            "Type \"npm run build\" to build files",
        ], {
            border: true,
            color: "yellow",
            borderColor: "yellow",
            marginTop: 1,
            marginBottom: 1,
            paddingTop: 1,
            paddingBottom: 1,
        });
    });
};

postInstallMsg();
