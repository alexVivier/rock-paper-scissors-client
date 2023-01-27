import Conf from 'conf';

const conf = new Conf({projectName: 'ropesc'});

export function getItem(key) {
    return conf.get(key);
}

export function setItem(key, value) {
    return !!conf.set(key, value);
}
