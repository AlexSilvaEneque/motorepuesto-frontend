import { generateClasses } from '@formkit/themes'

const config = {
    config: {
        classes: generateClasses({
            global: {
                wrapper: 'mb-2',
                message: 'pl-2 border-left-3 border-red-500 inline-block text-red-500 text-sm font-bold mb-3',
                label: 'block mb-1 font-semibold text-base text-800',
                input: 'w-full p-3 surface-border border-round border-1 hover:border-blue-300 text-gray-700 placeholder-gray-600 outline-none text-base',
            },
            submit: {
                input: '$reset bg-blue-500 hover:bg-blue-600 border-1 border-blue-500 border-round text-base upppercase text-white font-bold w-full p-3 mt-10 cursor-pointer animation-ease-in animation-duration-1000'
            }
        })
    }
}

export default config