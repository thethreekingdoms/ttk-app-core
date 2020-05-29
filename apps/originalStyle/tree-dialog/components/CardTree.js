import React, { useState, useCallback } from 'react'
import { Card, Button, Tree, Modal, Message } from 'edf-component'
import { useData, useActions, useCommit } from 'edf-app-loader'

export default function CardTree(props) {
  const parentId = useData([props, 'formObj', 'parentId'])
  const isEdit = useData([props, 'isEdit'])
  const selectKey = useData([props, 'selectKey']).toJS()
  const functioinId = useData([props, 'formObj', 'functioinId'])
  const name = useData([props, 'formObj', 'name'])
  const treeData = useData([props, 'treeData']).toJS()
  const [selectNode, setSelectNode] = useState()
  const actions = useActions(props)
  const commit = useCommit()

  const onLoadData = async (treeNode) => {
    const children = treeNode.props.dataRef.children
    if (children !== undefined && children && children.length>0) return
    const res = await actions.getTreeChildrenData(treeNode.props.dataRef)
  }

  const onSelect = (selectedKeys, {selected, selectedNodes, node, event} ) => {
    if(selected){
      setSelectNode(node.props.dataRef)
      commit([props, 'selectKey'], {type: 'init', data: node.props.dataRef.functioinId})
      actions.getTreeNodeDetail(node.props.dataRef.functioinId)
    }
  }
  const onAdd = useCallback((e) => {
    commit([props, 'tempState'], { type: 'setEdit', data: false })
    // commit([props, 'formObj'], { type: 'reset', data: { parentId: selectNode.functioinId, parentName: selectNode.name } })
  }, [functioinId, name])
  const onDelete = useCallback((e) => {
    Modal.confirm({
      title: '删除?',
      content: '确认删除',
      onOk() {
        async function de(){
          commit([props, 'tempState'], { type: 'setLoading', data: true })
          const result = await actions.deleteTreeItem()
          if(result.errorCode==='0') Message.success(result.errorMsg)
          commit([props, 'tempState'], { type: 'setLoading', data: false })
        }
        de()
      }
    })
  }, [])

  const renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <Tree.TreeNode 
          title={item.name} 
          key={item.functioinId} 
          isLeaf={item.subNodeFlag === '0'} 
          dataRef={item}>
            {renderTreeNodes(item.children)}
          </Tree.TreeNode>
        );
      }
      return <Tree.TreeNode title={item.name} key={item.functioinId} isLeaf={item.subNodeFlag === '0'} dataRef={item} />
    })
  }
  return (
    <Card
      className="ttk-card-tree"
      title="菜单树"
      extra={<div>
        <Button icon="plus" disabled={parentId === undefined} title="新增" onClick={onAdd} style={{marginRight: '10px'}} />
        <Button icon="close" disabled={functioinId === undefined} title="删除" onClick={onDelete} />
      </div>}
    >
      <Tree
        selectedKeys={selectKey}
        isLeaf={false}
        defaultExpandedKeys={['1']}
        onSelect={onSelect}
        loadData={onLoadData}
      >
        {renderTreeNodes(treeData)}
      </Tree>
    </Card>
  )
}