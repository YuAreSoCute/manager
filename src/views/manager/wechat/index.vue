<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="机构id" prop="parentId">
        <el-input
          v-model="queryParams.parentId"
          placeholder="请输入机构id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="模板消息的id" prop="templateId">
        <el-input
          v-model="queryParams.templateId"
          placeholder="请输入模板消息的id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开发者ID" prop="appId">
        <el-input
          v-model="queryParams.appId"
          placeholder="请输入开发者ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开发者密码" prop="appSecret">
        <el-input
          v-model="queryParams.appSecret"
          placeholder="请输入开发者密码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="服务器地址" prop="url">
        <el-input
          v-model="queryParams.url"
          placeholder="请输入服务器地址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="令牌" prop="token">
        <el-input
          v-model="queryParams.token"
          placeholder="请输入令牌"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="业务域名" prop="profession">
        <el-input
          v-model="queryParams.profession"
          placeholder="请输入业务域名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="js接口域名" prop="jsPort">
        <el-input
          v-model="queryParams.jsPort"
          placeholder="请输入js接口域名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="网页授权域名" prop="accredit">
        <el-input
          v-model="queryParams.accredit"
          placeholder="请输入网页授权域名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="网页授权域名" prop="partner">
        <el-input
          v-model="queryParams.partner"
          placeholder="请输入网页授权域名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="网页授权域名" prop="partnepKey">
        <el-input
          v-model="queryParams.partnepKey"
          placeholder="请输入网页授权域名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="网页授权域名" prop="paySuccess">
        <el-input
          v-model="queryParams.paySuccess"
          placeholder="请输入网页授权域名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['manager:wechat:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['manager:wechat:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['manager:wechat:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['manager:wechat:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="wechatList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="wxId" />
      <el-table-column label="机构id" align="center" prop="parentId" />
      <el-table-column label="模板消息的id" align="center" prop="templateId" />
      <el-table-column label="开发者ID" align="center" prop="appId" />
      <el-table-column label="开发者密码" align="center" prop="appSecret" />
      <el-table-column label="服务器地址" align="center" prop="url" />
      <el-table-column label="令牌" align="center" prop="token" />
      <el-table-column label="业务域名" align="center" prop="profession" />
      <el-table-column label="js接口域名" align="center" prop="jsPort" />
      <el-table-column label="网页授权域名" align="center" prop="accredit" />
      <el-table-column label="网页授权域名" align="center" prop="partner" />
      <el-table-column label="网页授权域名" align="center" prop="partnepKey" />
      <el-table-column label="网页授权域名" align="center" prop="paySuccess" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['manager:wechat:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['manager:wechat:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改wechat对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="机构id" prop="parentId">
          <el-input v-model="form.parentId" placeholder="请输入机构id" />
        </el-form-item>
        <el-form-item label="模板消息的id" prop="templateId">
          <el-input v-model="form.templateId" placeholder="请输入模板消息的id" />
        </el-form-item>
        <el-form-item label="开发者ID" prop="appId">
          <el-input v-model="form.appId" placeholder="请输入开发者ID" />
        </el-form-item>
        <el-form-item label="开发者密码" prop="appSecret">
          <el-input v-model="form.appSecret" placeholder="请输入开发者密码" />
        </el-form-item>
        <el-form-item label="服务器地址" prop="url">
          <el-input v-model="form.url" placeholder="请输入服务器地址" />
        </el-form-item>
        <el-form-item label="令牌" prop="token">
          <el-input v-model="form.token" placeholder="请输入令牌" />
        </el-form-item>
        <el-form-item label="业务域名" prop="profession">
          <el-input v-model="form.profession" placeholder="请输入业务域名" />
        </el-form-item>
        <el-form-item label="js接口域名" prop="jsPort">
          <el-input v-model="form.jsPort" placeholder="请输入js接口域名" />
        </el-form-item>
        <el-form-item label="网页授权域名" prop="accredit">
          <el-input v-model="form.accredit" placeholder="请输入网页授权域名" />
        </el-form-item>
        <el-form-item label="网页授权域名" prop="partner">
          <el-input v-model="form.partner" placeholder="请输入网页授权域名" />
        </el-form-item>
        <el-form-item label="网页授权域名" prop="partnepKey">
          <el-input v-model="form.partnepKey" placeholder="请输入网页授权域名" />
        </el-form-item>
        <el-form-item label="网页授权域名" prop="paySuccess">
          <el-input v-model="form.paySuccess" placeholder="请输入网页授权域名" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listWechat, getWechat, delWechat, addWechat, updateWechat, exportWechat } from "@/api/manager/wechat";

export default {
  name: "Wechat",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // wechat表格数据
      wechatList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        parentId: null,
        templateId: null,
        appId: null,
        appSecret: null,
        url: null,
        token: null,
        profession: null,
        jsPort: null,
        accredit: null,
        partner: null,
        partnepKey: null,
        paySuccess: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询wechat列表 */
    getList() {
      this.loading = true;
      listWechat(this.queryParams).then(response => {
        this.wechatList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        wxId: null,
        parentId: null,
        templateId: null,
        appId: null,
        appSecret: null,
        url: null,
        token: null,
        profession: null,
        jsPort: null,
        accredit: null,
        partner: null,
        partnepKey: null,
        paySuccess: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.wxId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加wechat";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const wxId = row.wxId || this.ids
      getWechat(wxId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改wechat";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.wxId != null) {
            updateWechat(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addWechat(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const wxIds = row.wxId || this.ids;
      this.$confirm('是否确认删除wechat编号为"' + wxIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delWechat(wxIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有wechat数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportWechat(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
