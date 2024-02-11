import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, Upload } from 'antd'
import axios from 'axios'
import { FC, useState } from 'react'

const TrackForm: FC = () => {
	const [form] = Form.useForm()
	const [imageFile, setImageFile] = useState<File | null>(null)
	const [audioFile, setAudioFile] = useState<File | null>(null)

	const onFinish = async (values: any) => {
		const formData = new FormData()
		formData.append('image', imageFile as Blob)
		formData.append('audio', audioFile as Blob)
		formData.append('title', values.title)

		try {
			await axios.post('http://localhost:3000/track', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			message.success('Track created successfully')

			form.resetFields()

			setImageFile(null)
			setAudioFile(null)

			window.location.reload()
		} catch (error) {
			message.error('Error creating track')
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
				rules={[{ required: true, message: 'Please input track title!' }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name='image'
				label='Image'
				valuePropName='fileList'
				getValueFromEvent={normFile}
				rules={[{ required: true, message: 'Please upload an image!' }]}
			>
				<Upload
					beforeUpload={file => {
						setImageFile(file)
						return false
					}}
					maxCount={1}
					listType='picture'
				>
					<Button icon={<UploadOutlined />}>Upload Image</Button>
				</Upload>
			</Form.Item>
			<Form.Item
				name='audio'
				label='Audio'
				valuePropName='fileList'
				getValueFromEvent={normFile}
				rules={[{ required: true, message: 'Please upload an audio file!' }]}
			>
				<Upload
					beforeUpload={file => {
						setAudioFile(file)
						return false
					}}
					maxCount={1}
					listType='text'
				>
					<Button icon={<UploadOutlined />}>Upload Audio</Button>
				</Upload>
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Create Track
				</Button>
			</Form.Item>
		</Form>
	)
}

export default TrackForm
