import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, Upload } from 'antd'
import axios from 'axios'
import { FC, useState } from 'react'

import styles from './TrackForm.module.scss'

const TrackForm: FC = () => {
	const [form] = Form.useForm()
	const [audioFile, setAudioFile] = useState<File | null>(null)

	const onFinish = async (values: { trackName: string }) => {
		const { trackName } = values

		if (!trackName || !audioFile) {
			console.error('Track name and audio file are required')
			return
		}

		const formData = new FormData()
		formData.append('title', trackName)
		formData.append('audio', audioFile)

		try {
			await axios.post('http://localhost:3000/files', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			message.success('Track created successfully')
			form.resetFields()
			setAudioFile(null)
			window.location.reload()
		} catch (error) {
			console.error('Error creating track:', error)
			message.error('Error creating track')
		}
	}

	const normFile = (e: any) => {
		if (Array.isArray(e)) {
			return e
		}
		return e && e.fileList
	}

	const beforeUpload = (file: File) => {
		setAudioFile(file)
		return false
	}

	return (
		<Form form={form} onFinish={onFinish} className={styles.form}>
			<Form.Item
				label='Track Name'
				name='trackName'
				rules={[{ required: true, message: 'Please input track name!' }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label='Audio File'
				name='audioFile'
				valuePropName='fileList'
				getValueFromEvent={normFile}
				rules={[{ required: true, message: 'Please select an audio file!' }]}
			>
				<Upload beforeUpload={beforeUpload} accept='audio/*'>
					<Button icon={<UploadOutlined />}>Select Audio File</Button>
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
