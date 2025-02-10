import { makeAutoObservable } from 'mobx';

class Store {
	_editingFields: string[] = [];
	_addingFields: string[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	resetField(field: string) {
		this._editingFields = this._editingFields.filter((f) => f !== field);
		this._addingFields = this._addingFields.filter((f) => f !== field);
	}

	addEditingField(name: string) {
		this._editingFields.push(name);
	}

	addAddingField(name: string) {
		this._addingFields.push(name);
	}

	resetFields() {
		this._editingFields = [];
		this._addingFields = [];
	}
}

export const store = new Store();
