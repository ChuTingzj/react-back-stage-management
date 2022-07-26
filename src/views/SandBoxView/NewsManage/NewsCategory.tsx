import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Form, FormInstance, Input, InputRef, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store/index'
import { getCategoryList, deleteCate, updateCategories } from '@/store/features/NewsSlice'
import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import confirm from 'antd/lib/modal/confirm'
export default function NewsCategory() {
  const dispatch: AppDispatch = useDispatch()
  const { categoryList } = useSelector((store: RootState) => store.news)
  useEffect(() => {
    dispatch(getCategoryList())
  }, [])
  const pop = (item: any) => {
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleFilled></ExclamationCircleFilled>,
      onOk() {
        dispatch(deleteCate(item.id))
      }
    })
  }
  interface EditableRowProps {
    index: number;
  }
  interface Item {
    id: number
    title: string
    value: string
  }
  interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
  }
  const handleSave = (record: Item) => {
    dispatch(updateCategories({ ...record }))
    dispatch(getCategoryList())
  }
  const EditableContext = React.createContext<FormInstance<any> | null>(null);
  const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;
    useEffect(() => {
      if (editing) {
        inputRef.current!.focus();
      }
    }, [editing]);
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
          {children}
        </div>
      );
    }
    return <td {...restProps}>{childNode}</td>;
  };


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id: number) => <b>{id}</b>
    },
    {
      title: '栏目名称',
      dataIndex: 'title',
      onCell: (record: any) => ({
        record,
        editable: true,
        dataIndex: 'title',
        title: '栏目名称',
        handleSave: handleSave
      })
    },
    {
      title: '操作',
      render: (item: any) => (
        <div>
          <Button onClick={() => pop(item)} danger shape='circle' icon={<DeleteOutlined></DeleteOutlined>}></Button>
        </div>
      )
    }
  ]
  return (
    <div>
      <Table components={{
        body: {
          row: EditableRow,
          cell: EditableCell,
        }
      }} columns={columns} dataSource={categoryList}></Table>
    </div>
  )
}
