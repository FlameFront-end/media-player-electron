import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'

import next from '../../assets/icons/next.png'
import pause from '../../assets/icons/pause.png'
import play from '../../assets/icons/play.png'

import { formatTime } from '../../helpers/formatTime'

import s from './AudioPlayer.module.scss'

interface AudioPlayerProps {
	src: string
	previewImage: string
}

const AudioPlayer: FC<AudioPlayerProps> = ({ src, previewImage }) => {
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [duration, setDuration] = useState(0)
	const [volume, setVolume] = useState(1)

	useEffect(() => {
		const audio = audioRef.current

		if (audio) {
			audio.volume = volume

			audio.addEventListener('timeupdate', () => {
				setCurrentTime(audio.currentTime)
			})

			audio.addEventListener('durationchange', () => {
				setDuration(audio.duration)
			})

			audio.addEventListener('ended', () => {
				setIsPlaying(false)
				setCurrentTime(0)
			})
		}

		return () => {
			if (audio) {
				audio.removeEventListener('timeupdate', () => {})
				audio.removeEventListener('durationchange', () => {})
				audio.removeEventListener('ended', () => {})
			}
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

	const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newTime = parseFloat(e.target.value)
		setCurrentTime(newTime)
		if (audioRef.current) {
			audioRef.current.currentTime = newTime
		}
	}

	const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newVolume = parseFloat(e.target.value)
		setVolume(newVolume)
	}

	return (
		<div className={s.wrapper}>
			<img src={previewImage} className={s.preview} alt='Track Preview' />
			<audio ref={audioRef} src={src}></audio>
			<div className={s.bottom}>
				<input
					type='range'
					value={currentTime}
					max={duration}
					onChange={handleTimeChange}
				/>
				<div className={s.time}>
					<span>{formatTime(currentTime)}</span>
					<span>-{formatTime(duration - currentTime)}</span>
				</div>

				<div className={s.btn_block}>
					<button>
						<img className={`${s.icons} ${s.prev}`} src={next} alt='prev' />
					</button>
					<button onClick={togglePlayPause}>
						{isPlaying ? (
							<img className={s.icons} src={pause} alt='pause' />
						) : (
							<img className={s.icons} src={play} alt='play' />
						)}
					</button>
					<button>
						<img className={s.icons} src={next} alt='next' />
					</button>
				</div>
				<input
					className={s.volume}
					type='range'
					value={volume}
					min={0}
					max={1}
					step={0.1}
					onChange={handleVolumeChange}
				/>
			</div>
		</div>
	)
}

export default AudioPlayer
