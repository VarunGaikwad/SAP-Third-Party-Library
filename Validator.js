sap.ui.define([], function () {
	"use strict";
	/**
	 * Custom Form Validator 
	 * PreApeXis :D
	 */
	const CheckForm = function () {
		this._bFormValidate = false;
	};
	CheckForm.prototype._validateForm = function (oControl) {
		const aFeildName = [];
		oControl.getContent().forEach(function (oField) {
			if (typeof oField.getValue === "function") {
				if (!(oField.getValue() || "").trim() && oField.getLabels()[0].getRequired() && oField.getVisible()) {
					oField.setValueState("Error");
					aFeildName.push(oField.getLabels()[0].getText());
					if (!this._bFormValidate) {
						this._bFormValidate = true;
					}
				} else {
					oField.setValueState("None");
				}
			}
		}.bind(this));
		if (aFeildName.length) {
			sap.m.MessageBox.warning("Please fill out following fields", {
				details: "<ul>" + aFeildName.map(function (oItem) {
					return "<li>" + oItem + "</li>";
				}) + "</ul>"
			});
		}
		return this._bFormValidate;
	};

	return CheckForm;
});
