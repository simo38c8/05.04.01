 window.addEventListener("load", sidenVises);

        function sidenVises() {
            console.log("siden vises");
            //klik på topmenu-knap
            document.querySelector("#menuknap").addEventListener("click", toggletopmenu);
            document.querySelector(".link").addEventListener("click", fjern);
            document.querySelector(".link2").addEventListener("click", fjern);
            document.querySelector(".link3").addEventListener("click", fjern);
            document.querySelector(".link4").addEventListener("click", fjern);
        }

        function toggletopmenu() {
            console.log("toggle topmenu");
            document.querySelector("#topmenu").classList.toggle("hidden");


            let erSkjult = document.querySelector("#topmenu").classList.contains("hidden");

            if (erSkjult == true) {
                //        topmenuen er nu skjult - ændre den til☰
                document.querySelector("#menuknap").textContent = "☰";
            } else {
                //        topmenuen er vist - ændre topmenuknap til ×
                document.querySelector("#menuknap").textContent = " × "

            }
        }
        

    function fjern(){
        console.log("funktion fjern virker");
        document.querySelector("#topmenu").classList.toggle("hidden");

            let erSkjult = document.querySelector("#topmenu").classList.contains("hidden"); /*Lavet af Simon Christiansen*/

            if (erSkjult == true) {
                //        topmenuen er nu skjult - ændre den til☰
                document.querySelector("#menuknap").textContent = "☰";
            } else {
                //        topmenuen er vist - ændre topmenuknap til ×
                document.querySelector("#menuknap").textContent = " × "

            }
        
    }
        
        
        document.addEventListener("DOMContentLoaded", start);
        let alleRetter = [];
        let filter = "alle";
        const dest = document.querySelector("#liste");
        async function start() {
            const myJson = await fetch("retter.json");
            alleRetter = await myJson.json();
            visRet();
        }
        function visRet() {
            dest.innerHTML = "";
            alleRetter.forEach(ret => {
                if (filter == "alle" || filter == ret.kategori) {
                    let template = `<div class="menuramme"><img src=imgs/${ret.billede}.jpg alt=${ret.navn}><h2>${ret.navn}</h2> <p>Pris: ${ret.pris},-</p></div>`;
                    dest.insertAdjacentHTML("beforeend", template);
                    dest.lastElementChild.addEventListener("click", () => {
                    visSingle(ret);
                    });
                    function visSingle(ret) {
                        document.querySelector("#indhold").innerHTML = `<div class="menuramme"><img src=imgs/${ret.billede}.jpg alt=${ret.navn}><h2>${ret.navn}</h2> <br><p>${ret.lang}</p> <br> <p>Pris: ${ret.pris},-</p></div>`;
                        document.querySelector("#popup").style.display = "block";
                        document.querySelector("#popup #luk").addEventListener("click", close);
                    }
                    function close() {
                        document.querySelector("#popup").style.display = "none";
                    }
                }
            })
        }
        document.querySelectorAll(".filter").forEach(elm => {
            elm.addEventListener("click", filtrering);
        })
        function filtrering() {
            filter = this.getAttribute("data-hold");
            document.querySelector("h1").textContent = this.textContent;
            document.querySelectorAll(".filter").forEach(elm => {
                elm.classList.remove("valgt");
            })
            this.classList.add("valgt");
            visRet();
        }
        start();
