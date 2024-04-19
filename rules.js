
let lock = 0;
class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        //this.engine.addChoice("Begin the story");
        this.engine.addChoice("Start from the Top!");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        //console.log(this.engine.storyData.Locations[key]);
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data

        if(locationData.Choices) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }

        
    }

    handleChoice(choice) {

        if(choice) {

            if(choice.Text == "duck and grab the key") {
                this.engine.show("&gt; "+choice.Text);
                lock = 1;
                console.log(lock);
                this.engine.gotoScene(Location, choice.Target);
            }
            else {
                console.log("inside conditional2");
                this.engine.show("&gt; "+choice.Text);
                if(choice.Text == "duck and open the Gate to the Farmyard") {
                    if(lock == 1) {
                        this.engine.gotoScene(Location, choice.Target);
                    }
                    else {
                        this.engine.gotoScene(Location, "The End");
                    }
                }
                else {
                    this.engine.gotoScene(Location, choice.Target);
                }
                
            }
            
        } else {
            this.engine.gotoScene(End);
        }
    }
}


class FarmYard extends Location {
    create(key) {
        console.log("I AM HERE!");
    }
    
}







class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

//Engine.load(Start, 'myStory.json');
Engine.load(Start, 'Duck-Duck-Game.json');