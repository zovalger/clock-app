import { classActive as active } from "../../utility/toggleClass.js";

class appSectionsManager {
	constructor() {
		this.$container = document.getElementById("appSectionsManager");

		this.buttonsSections = this.getButtons();
		this.lastButtonsection = null;

		let lastS = this.getLastSection();
		lastS
			? this.goToSection(lastS)
			: this.goToSection(Object.keys(this.buttonsSections)[1]);
	}

	// ****************************************************************
	// 											obtener los botones de seccion
	// ****************************************************************

	// se obtienen todos los botones dentro del contenedor
	// se le busca el data set data-app-section para saber a que seccion apuntan

	getButtons() {
		let btnObj = {},
			$buttons = this.$container.querySelectorAll("button");

		for (const $btn of $buttons) {
			let appSection = $btn.dataset.appSection;

			$btn.addEventListener("click", () => {
				this.goToSection(appSection);
			});

			btnObj[appSection] = $btn;
		}

		console.log(btnObj);

		return btnObj;
	}

	// ****************************************************************
	// 											cambiar de seccion
	// ****************************************************************

	// primero se busca la ultima seccion donde estaba el usuario
	// se deselecciona el boton y se desactiva su seccion correspondiente
	// luego se activa la nueva seccion junto con su boton

	goToSection(appSection) {
		if (this.lastButtonsection)
			this.buttonsSections[this.lastButtonsection].classList.remove("selected");

		if (JEANGER_APP[this.lastButtonsection])
			active(JEANGER_APP[this.lastButtonsection].$container, false);

		this.lastButtonsection = appSection;
		this.setActualSection(appSection);

		this.buttonsSections[this.lastButtonsection].classList.add("selected");

		if (JEANGER_APP[appSection])
			active(JEANGER_APP[appSection].$container, true);
	}

	getLastSection() {
		return localStorage.appSectionManager;
	}

	setActualSection(appSection) {
		localStorage.appSectionManager = appSection;
	}
}

export default appSectionsManager;
