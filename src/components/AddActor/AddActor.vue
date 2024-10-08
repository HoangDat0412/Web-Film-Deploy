<script setup>
import { useFilmStore } from '@/stores/film';
import { checkNull } from '@/validation/validation';
import { useRoute } from "vue-router";
const route = useRoute()
const film = useFilmStore()
import { ref,onBeforeMount } from 'vue';
const actorName = ref("")
const actorNameErr = ref("")
const handleAddActor = async ()=>{
    !checkNull(actorName.value) ? actorNameErr.value = "actor name không được bỏ trống" : actorNameErr.value = "";
    const flag = checkNull(actorName.value);
    if(flag){
        await film.createActor({
            filmId:route.params.id,
            actorName:actorName.value
        })
        actorName.value=""
    }
}
onBeforeMount(async ()=>{
    await film.setFilmDetail(route.params.id)
})

</script>

<template>
    <main>
        <h3 className='pt-4'>Cập Nhật Diễn Viên</h3>
      <div className='pt-4'>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#Id</th>
              <th scope="col">Tên Diễn Viên</th>
              <th scope="col">Xóa</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in film.filmDetail?.actor" :key="index">
                <th scope="row">{{item.id}}</th>
                <td>{{item.actorName}}</td>
                <td>
                  <button className='btn btn-danger' @click="()=> film.deleteActor(route.params.id,item.id)" >Xóa</button>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
      <form class="mt-5">
        <input type="text" name='actorName' v-model="actorName"  @keyup.enter="()=> handleAddActor()"  className="form-control" />
        <label className="form-label" >Tên Diễn Viên</label>
         <p style="color:red">{{ actorNameErr }}</p>
        <button className='btn btn-success' type='button' @click="()=> handleAddActor()" >Thêm Diễn Viên</button>
      </form>
    </main>
</template>