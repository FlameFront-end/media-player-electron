import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, Upload } from 'antd'
import axios from 'axios'
import { FC, useState } from 'react'

const VideoForm: FC = () => {
	const [form] = Form.useForm()
	const [videoFile, setVideoFile] = useState<File | null>(null)

	const onFinish = async (values: any) => {
		const formData = new FormData()
		formData.append('title', values.title)
		formData.append('video', videoFile as Blob)

		try {
			await axios.post('http://localhost:3000/video', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			message.success('Video created successfully')

			form.resetFields()

			setVideoFile(null)

			window.location.reload()
		} catch (error) {
			message.error('Error creating video')
		}
	}

	const normFile = (e: any) => {
		if (Array.isArray(e)) {
			return e
		}
		return e && e.fileList
	}

	return (
		<Form form={form} onFinish={onFinish}>
			<Form.Item
				name='title'
				label='Title'
				rules={[{ required: true, message: 'Please input video title!' }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name='video'
				label='Video'
				valuePropName='fileList'
				getValueFromEvent={normFile}
				rules={[{ required: true, message: 'Please upload an video!' }]}
			>
				<Upload
					beforeUpload={file => {
						setVideoFile(file)
						return false
					}}
					maxCount={1}
				>
					<Button icon={<UploadOutlined />}>Upload Video</Button>
				</Upload>
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Create Videos
				</Button>
			</Form.Item>
		</Form>
	)
}

export default VideoForm
