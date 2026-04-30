export default function Loading() {
    return (
        <>
            <span hidden>Loading...</span>
            <div class="flex items-center justify-center h-screen bg-gray-100">
                <div id="spinner-container" class="space-y-10">
                    <div class="flex justify-center space-x-1">
                        <div class="w-4 h-4 bg-blue-500
                                    rounded-full animate-bounce
                                    [animation-delay:-0.3s]">
                        </div>
                        <div class="w-4 h-4 bg-blue-500
                                    rounded-full animate-bounce
                                    [animation-delay:-0.15s]">
                        </div>
                        <div class="w-4 h-4 bg-blue-500
                                    rounded-full animate-bounce">
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}