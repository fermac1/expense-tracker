<template>
    <div class="p-6 font-satoshi">
        <div class="mb-4">
            <h1 class="text-[15px] text-[#252D37] font-bold mb-2">Spending analytics</h1>
            <p class="text-[#37404E] text-[12px] font-light mb-6">Here's how your expenses have shaped up this month.</p>
        </div>

        <!-- Overview Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 w-full">
            <div class="bg-[#ECC94B12] rounded-[12px] px-4 py-6 text-[#5C4800] bg-[url('/images/yellow-bg-pattern.png')] bg-no-repeat bg-contain">
                <div class="flex flex-row gap-2 mb-10">
                    <span class="bg-[#ECC94B33] px-1 py-1 rounded-[4px]"><img src="/icons/wallet.png" alt="wallet" /></span>
                    <p class="text-[13px] font-medium">Total spent</p>
                </div>
                <p class="text-[20px] md:text-[24px] font-bold"><del>N</del>50,000</p>
            </div>
            <div class="bg-[#8B5CF612] rounded-[12px] px-4 py-6 text-[#1C005C]  bg-[url('/images/purple-bg-pattern.png')] bg-no-repeat bg-contain">
                <div class="flex flex-row gap-2 mb-10">
                    <span class="bg-[#8B5CF633] p-1 rounded-[4px]"><img src="/icons/coin.png" alt="coin" /></span>
                    <p class="text-[13px] font-medium">Average daily spend</p>
                </div>
                <p class="text-[20px] md:text-[24px] font-bold"><del>N</del>50,000</p>
            </div>
            <div class="bg-[#F0F4FD] rounded-[12px] px-4 py-6 text-[#0D0D4F]  bg-[url('/images/blue-bg-pattern.png')] bg-no-repeat bg-contain">
                <div class="flex flex-row gap-2 mb-10">
                    <span class="bg-[#2563EB38] p-1 rounded-[4px]"><img src="/icons/level.png" alt="level" /></span>
                    <p class="text-[13px] font-medium">Daily count</p>
                </div>
                <p class="text-[20px] md:text-[24px] font-bold">50</p>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10 w-full">
            <div class="rounded-[12px] md:col-span-2 border border-[#EDEFF3] p-4">
                <div class="text-[#010101] mb-4">
                    <h1 class="text-[15px] font-bold mb-2">Expense breakdown</h1>
                    <p class="text-[12px] font-light">Here's your month in numbers</p>
                </div>
                <!-- <div class="h-screen bg-white px-4 md:px-8 py-12"> -->
                   <ExpenseList />
                <!-- </div> -->

            </div>
            <div class="rounded-[12px] md:col-span-3 border border-[#EDEFF3] p-4">
                <!-- <div class="flex flex-col md:flex-row justify-between mb-4">
                    <div class="text-[#010101]">
                        <h1 class="text-[15px] font-bold mb-2">Your Spending insights</h1>
                        <p class="text-[12px] font-light mb-6">Here's a breakdown of your year in numbers</p>
                    </div>
                    <div>
                        <button class="flex flex-row px-4 md:py-3 py-2 rounded-[6px] border border-[#EBEEF5] text-[#000000]">
                            <span class="font-medium md:text-[10px] text-[8px] mr-4">This year</span>   
                            <span>
                                <Icon name="bi:chevron-down" class="w-3 h-3"/>
                            </span>
                        </button>
                    </div>
                </div> -->

                <div class="min-h-screen flex justify-center items-start py-4 px-6">
                    <SpendingChart />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard-layout'
})

</script>
