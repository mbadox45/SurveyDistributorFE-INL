<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid">
            <div class="col-12 p-8">
                <!-- <div class="card"> -->
                    <h5 class="text-center">SELAMAT DATANG</h5>
                    <div class="grid">
                        <div class="lg:col-5 xl:col-5 sm:col-12 flex flex-column align-items-center justify-content-center">
                            <div class="w-full">
                                <label for="username" class="block text-900 text-xl font-medium mb-2">Username</label>
                                <InputText id="username" type="text" class="w-full" />
                                <label for="password" class="block text-900 text-xl font-medium mb-2">Password</label>
                                <InputText id="password" type="password" class="w-full"/>
                                <Button label="Login" class="mt-2"></Button>
                                <!-- <div class="field">
                                </div>
                                <div class="field">
                                </div> -->
                            </div>
                        </div>

                        <div class="lg:col-2 xl:col-2 sm:col-2 hidden sm:block">
                            <Divider layout="vertical">
                            </Divider>
                        </div>
                        <div class="lg:col-5 xl:col-5 sm:col-5 hidden sm:block align-items-center justify-content-center">
                            <p class="line-height-3 m-0">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                                enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                            </p>

                            <Divider layout="horizontal" align="center">
                                <span class="p-tag">Badge</span>
                            </Divider>

                            <p class="line-height-3 m-0">
                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                                culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                            </p>

                            <Divider align="right">
                                <Button label="Button" icon="pi pi-search" class="p-button-outlined"></Button>
                            </Divider>

                            <p class="line-height-3 m-0">
                                Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
                                voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Donec vel volutpat ipsum. Integer nunc magna, posuere ut tincidunt eget, egestas vitae sapien. Morbi dapibus luctus odio.
                            </p>
                        </div>
                    </div>
                <!-- </div> -->
            </div>
        </div>
    </div>
</template>