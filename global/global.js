import * as appLoader from 'edf-app-loader'
import * as component from 'edf-component'
import constant from 'edf-constant'
import * as consts from 'edf-consts'
import metaEngine from 'edf-meta-engine'
import utils from 'edf-utils'
import webapi from 'webapi'

import { changeTheme } from '../changeTheme'

window['edf-app-loader'] = appLoader
window['edf-component'] = component
window['edf-constant'] = constant
window['edf-consts'] = consts
window['edf-meta-engine'] = metaEngine
window['edf-utils'] = utils
window['edf-webapi'] = webapi


let origin = location.origin
changeTheme(origin, '#0066B3')
