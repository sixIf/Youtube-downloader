import ffmpeg from 'fluent-ffmpeg';
import pathToFfmpeg from 'ffmpeg-static';

ffmpeg.setFfmpegPath(
    // Ffmpeg.exe is unpacked into app.asar.unpacked
    pathToFfmpeg.toString().replace("app.asar", "app.asar.unpacked")
);

export interface IFfmpegService {
    sliceInput(inputPath: string, outputPath: string, start: number, end: number): Promise<string>;
    mergeAudioVideo(audioPath: string, videoPath: string, outputPath: string): Promise<string>;
    convertToMp3(audioPath: string, destAudio: string): Promise<string>;
}

export class FfmpegService implements IFfmpegService {
    convertToMp3(sourceAudio: string, destAudio: string): Promise<string> {
        return new Promise ( (resolve, reject) => {
            ffmpeg()
                .input(sourceAudio)
                .audioCodec('libmp3lame')
                .save(destAudio)
                .on('error', (err: Error) => reject(err.message))
                .on('end', () => resolve(`\nFinished converting to mp3, saved to ${destAudio}`));
        })
    }

    mergeAudioVideo(audioPath: string, videoPath: string, outputPath: string): Promise<string> {
        return new Promise ( (resolve, reject) => {
            ffmpeg()
                .input(videoPath)
                .videoCodec('copy')
                .input(audioPath)
                .audioCodec('copy')
                .save(outputPath)
                .on('error', (err: Error) => reject(err.message))
                .on('end', () => resolve(`\nFinished merging audio and video, saved to ${outputPath}`));
        })
    }
    
    sliceInput(inputPath: string, outputPath: string, start: number, end: number): Promise<string> {
        return new Promise ( (resolve, reject) => {
            const duration = end - start;
            ffmpeg()
                .input(inputPath)
                .seekInput(start)
                .output(outputPath)
                .duration(duration)
                .on('error', (err: Error) => reject(err.message))
                .on('end', () => resolve(`\nFinished slicing, saved to ${outputPath}`))
                .run();
        })
    }

}