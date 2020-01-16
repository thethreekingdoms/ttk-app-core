import {Map, Collection} from 'immutable'


const MapPrototype = Map.prototype
MapPrototype.sf = MapPrototype.setIn
MapPrototype.sfs = MapPrototype.merge

const CollectionPrototype = Collection.prototype;
CollectionPrototype.gf = CollectionPrototype.getIn;