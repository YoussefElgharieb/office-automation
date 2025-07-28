class Microcontroller {
    constructor(onActiveHandler, onInactiveHandler, isActive = true) {
        this.onActiveHandler = onActiveHandler;
        this.onInactiveHandler = onInactiveHandler;

        if(isActive){
            this.onActiveHandler();

            this.lastActiveAt = new Date();
            this.inactivityTimeout = setTimeout (() => {
                this.onInactiveHandler();
            }, 60 * 1000)
        }
    }

    resetActivity(){
        if(!this.isActive()){
            this.onActiveHandler();
        }

        this.lastActiveAt = new Date();

        if(this.inactivityTimeout){
            clearTimeout(this.inactivityTimeout);
        }

        this.inactivityTimeout = setTimeout (() => {
            this.onInactiveHandler();

        },  60*1000)
    }

    isActive() {
        return this.lastActiveAt !== undefined && new Date() - this.lastActiveAt < 60 * 1000
    }
}

export default Microcontroller;