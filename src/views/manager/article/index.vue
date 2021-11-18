<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户ID" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="机构ID" prop="parentId">
        <el-input
          v-model="queryParams.parentId"
          placeholder="请输入机构ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="新闻标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入新闻标题"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input
          v-model="queryParams.author"
          placeholder="请输入作者"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="排序标识" prop="sort">
        <el-input
          v-model="queryParams.sort"
          placeholder="请输入排序标识"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否置顶 ( 1：是   0:否）" prop="isTop">
        <el-input
          v-model="queryParams.isTop"
          placeholder="请输入是否置顶 ( 1：是   0:否）"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="类型" prop="category">
        <el-input
          v-model="queryParams.category"
          placeholder="请输入类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="新闻状态" prop="state">
        <el-input
          v-model="queryParams.state"
          placeholder="请输入新闻状态"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发布日期" prop="publishDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.publishDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择发布日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="封面地址" prop="cover">
        <el-input
          v-model="queryParams.cover"
          placeholder="请输入封面地址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司logo" prop="logo">
        <el-input
          v-model="queryParams.logo"
          placeholder="请输入公司logo"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备用字段1" prop="banner1">
        <el-input
          v-model="queryParams.banner1"
          placeholder="请输入备用字段1"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备用字段2" prop="banner2">
        <el-input
          v-model="queryParams.banner2"
          placeholder="请输入备用字段2"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备用字段3" prop="banner3">
        <el-input
          v-model="queryParams.banner3"
          placeholder="请输入备用字段3"
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
          v-hasPermi="['manager:article:add']"
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
          v-hasPermi="['manager:article:edit']"
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
          v-hasPermi="['manager:article:remove']"
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
          v-hasPermi="['manager:article:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="articleList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="新闻ID" align="center" prop="newsId" />
      <el-table-column label="用户ID" align="center" prop="userId" />
      <el-table-column label="机构ID" align="center" prop="parentId" />
      <el-table-column label="新闻标题" align="center" prop="title" />
      <el-table-column label="作者" align="center" prop="author" />
      <el-table-column label="排序标识" align="center" prop="sort" />
      <el-table-column label="是否置顶 ( 1：是   0:否）" align="center" prop="isTop" />
      <el-table-column label="类型" align="center" prop="category" />
      <el-table-column label="新闻状态" align="center" prop="state" />
      <el-table-column label="内容" align="center" prop="content" />
      <el-table-column label="发布日期" align="center" prop="publishDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.publishDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="封面地址" align="center" prop="cover" />
      <el-table-column label="公司logo" align="center" prop="logo" />
      <el-table-column label="备用字段1" align="center" prop="banner1" />
      <el-table-column label="备用字段2" align="center" prop="banner2" />
      <el-table-column label="备用字段3" align="center" prop="banner3" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['manager:article:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['manager:article:remove']"
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

    <!-- 添加或修改article对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="机构ID" prop="parentId">
          <el-input v-model="form.parentId" placeholder="请输入机构ID" />
        </el-form-item>
        <el-form-item label="新闻标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入新闻标题" />
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" placeholder="请输入作者" />
        </el-form-item>
        <el-form-item label="排序标识" prop="sort">
          <el-input v-model="form.sort" placeholder="请输入排序标识" />
        </el-form-item>
        <el-form-item label="是否置顶 ( 1：是   0:否）" prop="isTop">
          <el-input v-model="form.isTop" placeholder="请输入是否置顶 ( 1：是   0:否）" />
        </el-form-item>
        <el-form-item label="类型" prop="category">
          <el-input v-model="form.category" placeholder="请输入类型" />
        </el-form-item>
        <el-form-item label="新闻状态" prop="state">
          <el-input v-model="form.state" placeholder="请输入新闻状态" />
        </el-form-item>
        <el-form-item label="内容">
          <editor v-model="form.content" :min-height="192"/>
        </el-form-item>
        <el-form-item label="发布日期" prop="publishDate">
          <el-date-picker clearable size="small"
            v-model="form.publishDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择发布日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="封面地址" prop="cover">
          <el-input v-model="form.cover" placeholder="请输入封面地址" />
        </el-form-item>
        <el-form-item label="公司logo" prop="logo">
          <el-input v-model="form.logo" placeholder="请输入公司logo" />
        </el-form-item>
        <el-form-item label="备用字段1" prop="banner1">
          <el-input v-model="form.banner1" placeholder="请输入备用字段1" />
        </el-form-item>
        <el-form-item label="备用字段2" prop="banner2">
          <el-input v-model="form.banner2" placeholder="请输入备用字段2" />
        </el-form-item>
        <el-form-item label="备用字段3" prop="banner3">
          <el-input v-model="form.banner3" placeholder="请输入备用字段3" />
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
import { listArticle, getArticle, delArticle, addArticle, updateArticle, exportArticle } from "@/api/manager/article";

export default {
  name: "Article",
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
      // article表格数据
      articleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        parentId: null,
        title: null,
        author: null,
        sort: null,
        isTop: null,
        category: null,
        state: null,
        content: null,
        publishDate: null,
        cover: null,
        logo: null,
        banner1: null,
        banner2: null,
        banner3: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询article列表 */
    getList() {
      this.loading = true;
      listArticle(this.queryParams).then(response => {
        this.articleList = response.rows;
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
        newsId: null,
        userId: null,
        parentId: null,
        title: null,
        author: null,
        sort: null,
        isTop: null,
        category: null,
        state: null,
        content: null,
        publishDate: null,
        createTime: null,
        updateTime: null,
        cover: null,
        logo: null,
        banner1: null,
        banner2: null,
        banner3: null
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
      this.ids = selection.map(item => item.newsId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加article";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const newsId = row.newsId || this.ids
      getArticle(newsId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改article";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.newsId != null) {
            updateArticle(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addArticle(this.form).then(response => {
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
      const newsIds = row.newsId || this.ids;
      this.$confirm('是否确认删除article编号为"' + newsIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delArticle(newsIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有article数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportArticle(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
