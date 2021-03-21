const allowedDamageTypes = ['physical', 'poison', 'fire', 'water', 'air', 'earth'];
const allowedArrowTypes = ['normal', 'special'];
const allowedResistanceTypes = ['physical', 'poison', 'fire', 'water', 'air', 'earth'];
const allowedConsumablesTypes = ['minor', 'medium', 'big'];

class Item {
    constructor(name) {
        this._id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
        this.name = name;
    }

    set name(name) {
        if (typeof name != 'string') {
            throw Error(`${name}, doesn't meet the requirements - 'name' must be a string.`);
        }
        if (name.length < 3 || name.length > 50) {
            throw Error(`${name}, doesn't meet the requirements - length must be between 3 and 50 letters.`)
        }
        this._name = name;
    }

    getItemInfo() {
        return `Item ${this._id} - ${this._name}`;
    }
}

class Weapon extends Item {
    constructor(name, attack, damageType, twoHanded) {
        super(name);
        this.attack = attack;
        this.damageType = damageType;
        this.twoHanded = twoHanded;
        this._chance = Math.floor(Math.random() * (51 - 5) + 5); //generates random integer between 5 and 50(inclusive);
    }

    get chance() {
        return this._chance;
    }

    get twoHanded() {
        return this._twoHanded;
    }

    set attack(attack) {
        if (typeof attack != 'number') {
            throw Error(`${attack}, doesn't meet the requirements - 'attack' must be a number.`);
        }
        if (attack < 1 || attack > 30000) {
            throw Error(`${attack}, doesn't meet the requirements - attack must be between 1 and 30 000.`)
        }

        this._attack = attack;
    }

    set damageType(damageType) {
        if (allowedDamageTypes.includes(damageType) == false) {
            throw Error(`Invalid damage type - '${damageType}'.`)
        }
        this._damageType = damageType;
    }

    set twoHanded(isTwoHanded) {
        if (typeof isTwoHanded != 'boolean') {
            throw Error(`${isTwoHanded} doesn't meet the requirements - 'twoHanded' must be a boolean.`);
        }
        this._twoHanded = isTwoHanded;
    }

    getItemInfo() {
        let output = super.getItemInfo();
        output += ` has ${this._attack} of ${this._damageType} damage`;
        return output;
    }
}

class Sword extends Weapon {
    constructor(name, attack, damageType, twoHanded) {
        super(name, attack, damageType, twoHanded);
        this.twoHanded = twoHanded;
        this._bleed = twoHanded;
    }

    get cripple() {
        return this.twoHanded;
    }

    getItemInfo() {
        let output = super.getItemInfo();
        output += ` and has ${this.chance}% to`;
        if (this._cripple == true) {
            output += ' cripple';
        }
        if (this._bleed == true) {
            output += ' bleed';
        }
        return output;
    }
}

class Bow extends Weapon {
    constructor(name, attack, damageType, twoHanded, arrowType) {
        if (twoHanded == false) {
            throw Error('Bows cannot be one handed.')
        }

        super(name, attack, damageType, twoHanded);
        this.arrowType = arrowType;
    }

    set arrowType(arrowType) {
        if (allowedArrowTypes.includes(arrowType) == false) {
            throw Error(`Invalid arrow type.`);
        }
        this._arrowType = arrowType;

        if (arrowType == 'normal') {
            this._pierce = true;
            this._critical = false;
        } else {
            this._pierce == false;
            this._critical = true;
        }
    }

    getItemInfo() {
        let output = super.getItemInfo();
        output += ` and has ${this.chance}% to apply`
        if (this._pierce == true) {
            output += ' pierce';
        }

        if (this._critical == true) {
            output += ' critical'
        }
        return output;
    }
}

class Staff extends Weapon {

    constructor(name, attack, damageType, twoHanded) {
        if (damageType == 'physical') {
            throw Error(`Invalid damage type - 'physical'.`)
        }

        if (twoHanded == false) {
            throw Error('Staffs cannot be one handed.')
        }

        super(name, attack, damageType, twoHanded);
        
        switch (damageType) {
            case 'fire': {
                this._burn = true;
                this._ability = 'burn';
            } break;
            case 'poison': {
                this._poison = true;
                this._ability = 'poison';
            } break;
            case 'water': {
                this._cold = true;
                this._ability = 'cold';
            } break;
            case 'air': {
                this._electrify = true;
                this._ability = 'electrify';
            } break;
            case 'earth': {
                this._tremor = true;
                this._ability = 'tremor';
            } break;
        }
    }

    getItemInfo() {
        return super.getItemInfo() + ` and has ${this.chance}% to apply ${this._ability}`;
    }
}

class Armor extends Item {

    constructor(name, defense, resistance) {
        super(name);
        this.defense = defense;
        this.resistance = resistance;
        this._chance = Math.floor(Math.random() * (101 - 10) + 10); //generates random integer between 10 and 100(inclusive);
    }

    set defense(defense) {
        if (typeof defense != 'number') {
            throw Error(`${defense}, doesn't meet the requirements - 'defense' must be a number.`);
        }
        if (defense < 1 || defense > 50000) {
            throw Error(`${defense}, doesn't meet the requirements - defense must be between 1 and 30 000.`)
        }

        this._defense = defense;
    }

    set resistance(resistance) {
        if (allowedResistanceTypes.includes(resistance) == false) {
            throw Error(`Invalid resistance type - '${resistance}'.`)
        }

        this._resistance = resistance;
    }

    getItemInfo() {
        let output = super.getItemInfo();
        output += ` has ${this._defense} defense and ${this._chance}% ${this._resistance} resistance`;
        return output;
    }
}

class Helm extends Armor {

    constructor(name, defense, resistance, attractiveness) {
        super(name, defense, resistance);
        this.attractiveness = attractiveness;
    }

    set attractiveness(atr) {
        if (typeof atr != 'number') {
            throw Error(`${atr}, doesn't meet the requirements - 'attractiveness' must be a number.`);
        }
        if (atr < -5 || atr > 5) {
            throw Error(`${atr}, doesn't meet the requirements - 'attractiveness' must be between -5 and 5(inclusive).`)
        }
        this._attractiveness = atr;
    }

    getItemInfo() {
        let output = super.getItemInfo();
        output += ` and adds ${this._attractiveness} attractiveness`;
        return output;
    }
}

class Boots extends Armor {
    constructor(name, defense, resistance, speed) {
        super(name, defense, resistance);
        this.speed = speed;
    }

    set speed(speed) {
        if (typeof speed != 'number') {
            throw Error(`${speed}, doesn't meet the requirements - 'speed' must be a number.`);
        }
        if (speed < 1 || speed > 10) {
            throw Error(`${speed}, doesn't meet the requirements - 'speed' must be between 1 and 10(inclusive).`)
        }
        this._speed = speed;
    }

    getItemInfo() {
        let output = super.getItemInfo();
        output += ` and adds ${this._speed} speed`;
        return output;
    }
}

class Gloves extends Armor {

    constructor(name, defense, resistance, crafting) {
        super(name, defense, resistance);
        this.crafting = crafting;
    }

    set crafting(crafting) {
        if (typeof crafting != 'number') {
            throw Error(`${crafting}, doesn't meet the requirements - 'crafting' must be a number.`);
        }
        if (crafting < 1 || crafting > 10) {
            throw Error(`${crafting}, doesn't meet the requirements - 'crafting' must be between 1 and 10(inclusive).`)
        }
        this._crafting = crafting;
    }

    getItemInfo() {
        let output = super.getItemInfo();
        output += ` and adds ${this._crafting} crafting`;
        return output;
    }
}

class Robe extends Armor {

    constructor(name, defense, resistance, reputation) {
        super(name, defense, resistance);
        this.reputation = reputation;
    }

    set reputation(reputation) {
        if (typeof reputation != 'number') {
            throw Error(`${reputation}, doesn't meet the requirements - 'reputation' must be a number.`);
        }
        if (reputation < 1 || reputation > 10) {
            throw Error(`${reputation}, doesn't meet the requirements - 'reputation' must be between 1 and 10(inclusive).`)
        }
        this._reputation = reputation;
    }

    getItemInfo() {
        let output = super.getItemInfo();
        output += ` and adds ${this._reputation} reputation`;
        return output;
    }
}

class Consumable extends Item {

    constructor(name, heals, type) {
        super(name);
        this.heals = heals;
        this.type = type;
    }

    set heals(heals) {
        if (typeof heals != 'boolean') {
            throw Error(`${heals}, doesn't meet the requirements - 'heals' must be a boolean.`)
        }

        this._heals = heals;
    }

    set type(type) {
        if (allowedConsumablesTypes.includes(type) == false) {
            throw Error(`Invalid consumable type - '${type}'.`);
        }

        this._type = type;
        if (type == 'minor') {
            this._effect = Math.floor(Math.random() * (11 - 1) + 1);
        } else if (type == 'medium') {
            this._effect = Math.floor(Math.random() * (21 - 11) + 11);
        } else {
            this._effect = Math.floor(Math.random() * (31 - 21) + 21);
        }
    }

    getItemInfo() {
        let output = super.getItemInfo();
        if (this._heals == true) {
            output += ` it is ${this._type} potion and heals for ${this._effect}`;
        } else {
            output += ` it is ${this._type} potion and damages for ${this._effect}`;
        }
        return output;
    }
}

const item = new Item('test-item');
console.log(item.getItemInfo());

const weapon = new Weapon('weapon-name', 10, 'physical', true);
console.log(weapon.getItemInfo());

const sword = new Sword('sword-name', 10, 'physical', true);
console.log(sword.getItemInfo());

const bow = new Bow('bow-name', 10, 'physical', true, 'normal');
console.log(bow.getItemInfo());

const staff = new Staff('staff-name', 10, 'fire', true);
console.log(staff.getItemInfo());

const armor = new Armor('armor-name', 20, 'air');
console.log(armor.getItemInfo());

const helm = new Helm('helm-name', 20, 'air', 5);
console.log(helm.getItemInfo());

const boots = new Boots('boots-name', 20, 'air', 10);
console.log(boots.getItemInfo());

const gloves = new Gloves('gloves-name', 20, 'air', 10);
console.log(gloves.getItemInfo());

const robe = new Robe('robe-name', 20, 'air', 10);
console.log(robe.getItemInfo());

const consumableH = new Consumable('consumableH-name', true, 'medium');
console.log(consumableH.getItemInfo());

const consumableD = new Consumable('consumableD-name', false, 'medium');
console.log(consumableD.getItemInfo());
