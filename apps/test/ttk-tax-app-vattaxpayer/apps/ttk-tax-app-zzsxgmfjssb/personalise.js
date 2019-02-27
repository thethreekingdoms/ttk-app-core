import { Map, fromJS } from 'immutable'

function personalise( SS, tMeta, qtxx ) {
	switch(SS) {
		case '11':
            tMeta = beijing(tMeta, qtxx );
            break;
    }
    return tMeta
}

function beijing( tMeta, qtxx ) {
	tMeta['C01'].renderMerge = tMeta['C01'].renderMerge.map( rItem => {
        if( rItem.index == 13 ) {
            if( qtxx.ckms == 'Y' ) {
                rItem.component = "Input"
            } else {
                rItem.component = "Text"                
            }
        }
        return rItem
    })
    return tMeta
}

export default personalise