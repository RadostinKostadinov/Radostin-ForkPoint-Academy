const allowedDamageTypes = ['physical', 'poison', 'fire', 'water', 'air', 'earth'];
const allowedArrowTypes = ['normal', 'special'];
const allowedResistanceTypes = ['physical', 'poison', 'fire', 'water', 'air', 'earth'];
const allowedConsumablesTypes = ['minor', 'medium', 'big'];

class Item {
    #id;
    #name;
    constructor(name) {
        this.#id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
        this.name = name;
    }

    set name(name) {
        if (typeof name != 'string') {
            throw Error(`${name}, doesn't meet the requirements - 'name' must be a string.`);
        }
        if (name.length < 3 || name.length > 50) {
            throw Error(`${name}, doesn't meet the requirements - length must be between 3 and 50 letters.`)
        }
        this.#name = name;
    }

    getItemInfo() {
        return `Item ${this.#id} - ${this.#name}`;
    }
}

class Weapon extends Item {
    #attack;
    #damageType;
    #twoHanded;
    #chance;
    constructor(name, attack, damageType, twoHanded) {
        super(name);
        this.attack = attack;
        this.damageType = damageType;
        this.twoHanded = twoHanded;
        this.#chance = Math.floor(Math.random() * (51 - 5) + 5); //generates random integer between 5 and 50(inclusive);
    }

    get chance() {
        return this.#chance;
    }

    get twoHanded() {
        return this.#twoHanded;
    }

    set attack(attack) {
        if (typeof attack != 'number') {
            throw Error(`${attack}, doesn't meet the requirements - 'attack' must be a number.`);
        }
        if (attack < 1 || attack > 30000) {
            throw Error(`${attack}, doesn't meet the requirements - attack must be between 1 and 30 000.`)
        }

        this.#attack = attack;
    }

    set damageType(damageType) {
        if (allowedDamageTypes.includes(damageType) == false) {
            throw Error(`Invalid damage type - '${damageType}'.`)
        }
        this.#damageType = damageType;
    }

    set twoHanded(isTwoHanded) {
        if (typeof isTwoHanded != 'boolean') {
            throw Error(`${isTwoHanded} doesn't meet the requirements - 'twoHanded' must be a boolean.`);
        }
        this.#twoHanded = isTwoHanded;
    }

    getItemInfo() {
        let output = super.getItemInfo();
        output += ` has ${this.#attack} of ${this.#damageType} damage`;
        return output;
    }
}

class Sword extends Weapon {
    #cripple;
    #bleed;
    constructor(name, attack, damageType, twoHanded) {
        super(name, attack, damageType, twoHanded);
        this.twoHanded = twoHanded;
        this.#bleed = twoHanded;
    }

    get cripple() {
        return this.twoHanded;
    }

    getItemInfo() {
        let output = super.getItemInfo();
        output += ` and has ${this.chance}% to`;
        if (this.#cripple == true) {
            output += ' cripple';
        }
        if (this.#bleed == true) {
            output += ' bleed';
        }
        return output;
    }
}

class Bow extends Weapon {
    #arrowType;
    #pierce;
    #critical;
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
        this.#arrowType = arrowType;

        if (arrowType == 'normal') {
            this.#pierce = true;
            this.#critical = false;
        } else {
            this.#pierce == false;
            this.#critical = true;
        }
    }

    getItemInfo() {
        let output = super.getItemInfo();
        output += ` and has ${this.chance}% to apply`
        if (this.#pierce == true) {
            output += ' pierce';
        }

        if (this.#critical == true) {
            output += ' critical'
        }
        return output;
    }
}

class Staff extends Weapon {
    #burn; #poison; #cold; #electrify; #tremor;
    #ability;

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
                this.#burn = true;
                this.#ability = 'burn';
            } break;
            case 'poison': {
                this.#poison = true;
                this.#ability = 'poison';
            } break;
            case 'water': {
                this.#cold = true;
                this.#ability = 'cold';
            } break;
            case 'air': {
                this.#electrify = true;
                this.#ability = 'electrify';
            } break;
            case 'earth': {
                this.#tremor = true;
                this.#ability = 'tremor';
            } break;
        }
    }

    getItemInfo() {
        return super.getItemInfo() + ` and has ${this.chance}% to apply ${this.#ability}`;
    }
}

class Armor extends Item {
    #defense; #resistance; #chance;

    constructor(name, defense, resistance) {
        super(name);
        this.defense = defense;
        this.resistance = resistance;
        this.#chance = Math.floor(Math.random() * (101 - 10) + 10); //generates random integer between 10 and 100(inclusive);
    }

    set defense(defense) {
        if (typeof defense != 'number') {
            throw Error(`${defense}, doesn't meet the requirements - 'defense' must be a number.`);
        }
        if (defense < 1 || defense > 50000) {
            throw Error(`${defense}, doesn't meet the requirements - defense must be between 1 and 30 000.`)
        }

        this.#defense = defense;
    }

    set resistance(resistance) {
        if (allowedResistanceTypes.includes(resistance) == false) {
            throw Error(`Invalid resistance type - '${resistance}'.`)
        }

        this.#resistance = resistance;
    }

    getItemInfo() {
        let output = super.getItemInfo();
        output += ` has ${this.#defense} defense and ${this.#chance}% ${this.#resistance} resistance`;
        return output;
    }
}

class Helm extends Armor {
    #attractiveness;

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
        this.#attractiveness = atr;
    }

    getItemInfo() {
        let output = super.getItemInfo();
        output += ` and adds ${this.#attractiveness} attractiveness`;
        return output;
    }
}

class Boots extends Armor {
    #speed;

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
        this.#speed = speed;
    }

    getItemInfo() {
        let output = super.getItemInfo();
        output += ` and adds ${this.#speed} speed`;
        return output;
    }
}

class Gloves extends Armor {
    #crafting;

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
        this.#crafting = crafting;
    }

    getItemInfo() {
        let output = super.getItemInfo();
        output += ` and adds ${this.#crafting} crafting`;
        return output;
    }
}

class Robe extends Armor {
    #reputation;

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
        this.#reputation = reputation;
    }

    getItemInfo() {
        let output = super.getItemInfo();
        output += ` and adds ${this.#reputation} reputation`;
        return output;
    }
}

class Consumable extends Item {
    #heals; #type; #effect;

    constructor(name, heals, type) {
        super(name);
        this.heals = heals;
        this.type = type;
    }

    set heals(heals) {
        if (typeof heals != 'boolean') {
            throw Error(`${heals}, doesn't meet the requirements - 'heals' must be a boolean.`)
        }

        this.#heals = heals;
    }

    set type(type) {
        if (allowedConsumablesTypes.includes(type) == false) {
            throw Error(`Invalid consumable type - '${type}'.`);
        }

        this.#type = type;
        if (type == 'minor') {
            this.#effect = Math.floor(Math.random() * (11 - 1) + 1);
        } else if (type == 'medium') {
            this.#effect = Math.floor(Math.random() * (21 - 11) + 11);
        } else {
            this.#effect = Math.floor(Math.random() * (31 - 21) + 21);
        }
    }

    getItemInfo() {
        let output = super.getItemInfo();
        if (this.#heals == true) {
            output += ` it is ${this.#type} potion and heals for ${this.#effect}`;
        } else {
            output += ` it is ${this.#type} potion and damages for ${this.#effect}`;
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
