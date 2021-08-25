import Image from 'next/image'

export default function Images({ image, width, height, src, layout }) {
    const imageurl = image.product_image?.map(({ formats }) => formats.small.url)
    return (
        <Image
            src={imageurl[0]}
            width={width}
            height={height}
            objectFit="cover"
            layout={layout}
            className="rounded-lg"
        />
    )
}
