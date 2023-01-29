import {printUsersOnTable, addTabsControlClickListener, addVerifiedUsersChangeListener} from './users-info/table.js';
import {initMap} from './users-info/map.js';
import {addChangeInfoBlockClickListener} from './users-info/info-switcher.js';

printUsersOnTable();
addTabsControlClickListener();
addVerifiedUsersChangeListener();
initMap();
addChangeInfoBlockClickListener();
