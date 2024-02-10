import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { Button, Image, Slider } from 'antd'
import { FC, useEffect, useRef, useState } from 'react'

import { formatTime } from '../../helpers/formatTime'

import s from './AudioPlayer.module.scss'

interface AudioPlayerProps {
	src: string
	previewImage: string
	title: string
}

const AudioPlayer: FC<AudioPlayerProps> = ({ src, previewImage, title }) => {
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [duration, setDuration] = useState(0)
	const [volume, setVolume] = useState(1)

	useEffect(() => {
		const audio = audioRef.current

		if (audio) {
			audio.volume = volume

			const updateTime = () => setCurrentTime(audio.currentTime)
			const updateDuration = () => setDuration(audio.duration)
			const handleEnded = () => {
				setIsPlaying(false)
				setCurrentTime(0)
			}

			audio.addEventListener('timeupdate', updateTime)
			audio.addEventListener('durationchange', updateDuration)
			audio.addEventListener('ended', handleEnded)
		}
	}, [volume])

	const togglePlayPause = () => {
		const audio = audioRef.current
		if (audio) {
			if (isPlaying) {
				audio.pause()
			} else {
				audio.play()
			}
			setIsPlaying(!isPlaying)
		}
	}

	const handleTimeChange = (value: number) => {
		setCurrentTime(value)
		if (audioRef.current) {
			audioRef.current.currentTime = value
		}
	}

	const handleVolumeChange = (value: number) => {
		setVolume(value)
	}

	return (
		<div className={s.wrapper}>
			<h2 className={s.title}>{title}</h2>
			<Image
				src={previewImage}
				className='audio-player-preview'
				alt='Track Preview'
			/>
			<audio ref={audioRef} src={src}></audio>
			<div className={s.bottom}>
				<Slider
					value={currentTime}
					max={duration}
					onChange={handleTimeChange}
				/>
				<div className={s.row}>
					<div className={s.row_item}>
						<Button onClick={togglePlayPause}>
							{isPlaying ? (
								<PauseCircleOutlined className='audio-player-icons' />
							) : (
								<PlayCircleOutlined className='audio-player-icons' />
							)}
						</Button>
						<div className={s.time}>
							<span>{formatTime(currentTime)}</span>
							<span>-{formatTime(duration - currentTime)}</span>
						</div>
					</div>
					<div className={s.row_item}>
						<Slider
							className={s.volume}
							value={volume}
							min={0}
							max={1}
							step={0.1}
							onChange={handleVolumeChange}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AudioPlayer
