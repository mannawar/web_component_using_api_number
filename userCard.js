const template = document.createElement('template');
template.innerHTML = `
<style>
  .user-card {
		font-family: 'Arial', sans-serif;
		background: #f4f4f4;
		width: 500px;
		display: flex;
		grid-template-columns: 1fr;
		grid-gap: 10px;
		margin-bottom: 15px;
		border-bottom: darkorchid 5px solid;
	}
    .card-body {
        margin-top: 15px;
    }

  </style>
<div class="user-card">
    <div class="container">
        <div class="row">
            <div class="col-md-6 mx-auto">
                <div class="card bg-primary text-white mt-5 p-4">
                    <h1>Number Facts</h1>
                    <p>Enter a number and get the numerical fact about that</p>
                    <input type="number" class="form-control form-control-lg" id="numberInput" placeholder="Enter any number...">
                    <div id="fact" class="card-body">
                        <h3 class="card-title">
                            Number Facts
                        </h3>
                        <p class="card-text" id="factText"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;

class UserCard extends HTMLElement {
    constructor() {
        super();
        this.showInfo= true;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('input').value = this.getAttribute('value');
    }

        //Fetch Api
        getFactFetch() {
            let fact = this.shadowRoot.querySelector('#fact');
            let factText = this.shadowRoot.querySelector('#factText');
            let numberInput = this.shadowRoot.querySelector('#numberInput');
            let number = numberInput.value;
            fetch('https://numbersapi.com/'+number)
            .then(res => res.text())
            .then(data => {
                if(number !='') {
                    fact.style.display = 'block';
                    fact.innerText = data;
                }
            })
            .catch(error => console.log(error))
        }


    //API callback
    connectedCallback() {
       this.shadowRoot.querySelector('#numberInput').addEventListener('input', () => this.getFactFetch())
    }
}

window.customElements.define('user-card', UserCard);