// core
import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";

// components
import { Button, Form, Space } from "antd";
import {
  ProForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";

export async function action() {
  return json({
    title: 1,
  });
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function Index() {
  const fetcher = useFetcher();

  const [form] = Form.useForm();

  const onGenderChange = (value: string) => {
    switch (value) {
      case "male":
        form.setFieldsValue({ note: "Hi, man!" });
        break;
      case "female":
        form.setFieldsValue({ note: "Hi, lady!" });
        break;
      case "other":
        form.setFieldsValue({ note: "Hi there!" });
        break;
      default:
    }
  };

  const onFinish = (value: any) => {
    const formData = new FormData();
    formData.append("username", value.username);
    formData.append("password", value.password);

    fetcher.submit(formData, { method: "post" });
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({ note: "Hello world!", gender: "male" });
  };
  return (
    <div>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <ProFormText name="note" label="Note" rules={[{ required: true }]} />
        <ProFormSelect
          name="gender"
          label="Gender"
          rules={[{ required: true }]}
          fieldProps={{
            onChange: onGenderChange
          }}
          options={[
            {
              label: "male",
              value: "male",
            },
            {
              label: "female",
              value: "female",
            },
            {
              label: "other",
              value: "other",
            },
          ]}
        />
        <ProFormDependency name={["gender"]}>
          {({ gender }) => {
            return gender === "other" ? (
              <ProFormText
                noStyle
                name="customizeGender"
                label="Customize Gender"
                rules={[{ required: true }]}
              />
            ) : null;
          }}
        </ProFormDependency>
        <ProForm.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
            <Button type="link" htmlType="button" onClick={onFill}>
              Fill form
            </Button>
          </Space>
        </ProForm.Item>
      </Form>
    </div>
  );
}
