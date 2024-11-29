class module{

    constructor(){
        /**root */
        this.mainWp = document.getElementById("root-of-modul-progress");
        this.tabsColorActive = "rgb(103, 182, 242)";
        this.tabsColorPas = "gray";
        this.inputValue  =  0 
        /**события  */
        this.mainWp.addEventListener("click", this.chekBox.bind(this));
        this.mainWp.addEventListener("change", this.inputValueChange.bind(this));
    }
    /**создание html */
    htmlForm(){
        
        const html = `
            <div class="progress-main-wp flex">
                <div class="progress-bar-wp flex">
                    <h3 class="progress-title">Progress</h3>
                    <div class="canvas-wp">
                        <canvas class="progress-bar" id="progress-bar"></canvas>
                    </div>
                    
                    
                </div>
                <div class="progress-tabs-wp flex">
                    <div class="tab">
                        <input type="number" value="40" min="1" max="100" class="tabs-form tab-input">
                        <p>Value</p>
                    </div>
                    <div class="tab" >
                        
                        <label class="tabs-form tab-animated" >
                            <input class="hide-input" id="tab-animated" type="checkbox">
                            <span class="round-tumbler"></span>
                            <span class="on"></span>
                            <span class="off"></span>
                        </label>
                        <p>Animated</p>
                    </div>
                    <div class="tab" >
                        <label class="tabs-form tab-hide">
                            <input class="hide-input" id="tab-hide" type="checkbox">
                            <span class="round-tumbler"></span>
                            <span class="on"></span>
                            <span class="off"></span>
                        </label>
                        
                        <p>Hide</p>
                    </div>
                </div>
            </div>
        `
        this.mainWp.insertAdjacentHTML("beforeend", html);
        this.inputValue  = document.querySelector(".tab-input").value;
   
        this.getRound(this.inputValue);
    }
    /**переключение chekbox */
    chekBox(event){
        const item  =  event.target.closest(".hide-input");
        if(!item){
            return
        }
        if(item.checked){
            item.parentElement.style.backgroundColor = this.tabsColorActive;
            const collection = document.querySelectorAll(".hide-input");
            collection.forEach(el => {
                if(item.id !== el.id){
                    el.checked = false;
                    el.parentElement.style.backgroundColor = this.tabsColorPas;
                }
            })
            if (item.id === "tab-animated" ) {
                const wp  = document.querySelector(".canvas-wp");
                wp.classList.add("animated-round");  
                wp.classList.remove("hide"); 
            }else if(item.id === "tab-hide"){
                const wp  = document.querySelector(".canvas-wp");
                wp.classList.remove("animated-round");  
                wp.classList.add("hide"); 
            }
        }else{
            item.parentElement.style.backgroundColor = this.tabsColorPas; 
            const wp  = document.querySelector(".canvas-wp");
             wp.classList.remove("animated-round");
             wp.classList.remove("hide"); 
        }
    }
    /**cмена значения  */
    inputValueChange(event){
        const item  =  event.target.closest(".tab-input");
        if(!item){
            return
        }
        
        item.value > 0 && item.value < 101 ? this.getRound(item.value) : this.defaultValue();
        
    }
    defaultValue(){

        this.getRound(this.inputValue);
        let item  =  document.querySelector(".tab-input");
        item.value = ''
        item.value = this.inputValue
        this.error();
    }
    error(){
        const root  = document.querySelector(".progress-main-wp ")
        const html = `
            <div class="error-wp">
                <p>max value 100 and min value 1</p>
            </div>
        `
        root.insertAdjacentHTML("beforeend", html);
        setTimeout(() => {
            const error = document.querySelector(".error-wp");
            error.remove();
        }, 1500);
    }
    /**создание окружности*/
    getRound(value) {
        const canvas = document.getElementById('progress-bar');
        canvas.width =150;
        canvas.height = 150;
        const ctx = canvas.getContext('2d');
        
        let currentValue = 0; 
        let increment = value / 100; 
    
        const animate = () => {
            if (currentValue <= value) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
    
                const degrees = (currentValue * 360) / 100;
    
                const r = canvas.width / 2;
                const centerX = r;
                const centerY = r;
    
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, r, 1.5 * Math.PI, 1.5 * Math.PI + getRadians(degrees), false);
                ctx.lineTo(centerX, centerY);
                ctx.fillStyle = this.tabsColorActive;
                ctx.fill();
    
                currentValue += increment; 
                requestAnimationFrame(animate); 
            }
    
            function getRadians(degrees) {
                return (Math.PI / 180) * degrees;
            }
        }
        animate(); 
        this.inputValue = value   
    }
}
const test = new module();
test.htmlForm();
